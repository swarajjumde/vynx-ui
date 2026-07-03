param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string] $TaskFile,

  [Parameter(Position = 1)]
  [string] $Model = "opus",

  [Parameter(Position = 2)]
  [int] $MaxTurns = 6
)

$ErrorActionPreference = "Stop"

function Find-RepoRoot {
  $root = git rev-parse --show-toplevel 2>$null
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($root)) {
    throw "Could not resolve repository root."
  }
  return (Resolve-Path -LiteralPath $root).Path
}

$repoRoot = Find-RepoRoot
Set-Location -LiteralPath $repoRoot

$resolvedTask = Resolve-Path -LiteralPath $TaskFile -ErrorAction Stop
if (-not (Test-Path -LiteralPath $resolvedTask.Path -PathType Leaf)) {
  throw "Task file does not exist: $TaskFile"
}

$taskText = Get-Content -LiteralPath $resolvedTask.Path -Raw -Encoding UTF8
$help = (& claude --help) -join "`n"

$runDir = Join-Path $repoRoot ".ai\runs"
New-Item -ItemType Directory -Force -Path $runDir | Out-Null
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outputFile = Join-Path $runDir "$timestamp-claude.json"

$prompt = @"
You are Claude Code working in this repository.

Follow CLAUDE.md and the task below exactly. Do not read secrets or .env files.
Maximum turns for this task: $MaxTurns.

$taskText
"@

$argsList = @()

if ($help -match "(?m)(^|\s)(-p|--print)(\s|,|$)") {
  $argsList += "--print"
} else {
  throw "Installed Claude CLI does not support non-interactive print mode."
}

if ($help -match "--model") {
  $argsList += @("--model", $Model)
}

if ($help -match "--output-format") {
  $argsList += @("--output-format", "json")
}

if ($help -match "--permission-mode" -and $help -match "acceptEdits") {
  $argsList += @("--permission-mode", "acceptEdits")
}

if ($help -match "--max-turns") {
  $argsList += @("--max-turns", [string] $MaxTurns)
} elseif ($help -match "--max-turn") {
  $argsList += @("--max-turn", [string] $MaxTurns)
}

if ($help -match "--no-session-persistence") {
  $argsList += "--no-session-persistence"
}

try {
  $output = $prompt | & claude @argsList 2>&1
  $exitCode = $LASTEXITCODE
} finally {
  if ($null -ne $output) {
    $output | Out-File -LiteralPath $outputFile -Encoding UTF8
  }
}

Write-Host "Claude output saved to $outputFile"
exit $exitCode


