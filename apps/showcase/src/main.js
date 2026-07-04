// JavaScript entry point for the Vue Lynx showcase app.
// Vue Lynx mirrors Vue's `createApp` API; the Lynx runtime attaches the
// resulting app to the native Lynx view tree (no DOM element / selector here).
import { createApp } from 'vue';
import App from './App.vue';

export const app = createApp(App);

export default app;
