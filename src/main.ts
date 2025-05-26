import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import LoadingApp from './LoadingApp.vue';

import { delay } from './lib/async';
import { registerPrograms } from './lib/programs';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

async function main() {
    let loadingApp = createApp(LoadingApp);
    loadingApp.mount('#app');

    registerPrograms();

    await delay(2000);
    
    loadingApp.unmount();

    let app = createApp(App);
    
    app.use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })

    app.mount('#app');
}

main();
