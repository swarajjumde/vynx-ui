// JavaScript-first Vue Lynx entry, matching the official `create-vue-lynx`
// scaffold: mount the app with `createApp` from `vue-lynx` (no browser DOM).
import { createApp } from 'vue-lynx';
import App from './App.vue';

const app = createApp(App);
app.mount();

export default app;
