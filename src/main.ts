import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import LoadingApp from './LoadingApp.vue';

import { delay } from './lib/async';

async function main() {
    let loadingApp = createApp(LoadingApp);
    loadingApp.mount('#app');

    await delay(2000);
    
    loadingApp.unmount();
    let app = createApp(App);
    app.mount('#app');
}

main();
