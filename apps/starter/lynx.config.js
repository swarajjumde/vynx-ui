// Rspeedy configuration for the Vynx Admin starter (Vue Lynx), based on the
// official `create-vue-lynx` JavaScript template (https://vue.lynxjs.org/).
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginVueLynx } from 'vue-lynx/plugin';

export default defineConfig({
  environments: { lynx: {}, web: {} },
  source: { entry: './src/index.js' },
  plugins: [
    pluginQRCode({
      schema(url) {
        return `${url}?fullscreen=true`;
      },
    }),
    pluginVueLynx({
      optionsApi: false,
      enableCSSInlineVariables: true,
      enableCSSInheritance: true,
    }),
  ],
});
