import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'
import axios from 'axios'
import mitt from 'mitt'
import Spinner from './components/global/Spinner.vue';

import App from './App.vue'
import router from './router'

const emitter = mitt()
const app = createApp(App)

app.use(Notifications)
app.use(router)
app.use(VueAxios, axios)

app.component('spinner', Spinner)

app.config.globalProperties.emitter = emitter
app.mount('#app')
