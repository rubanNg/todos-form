import { App as Vue, createApp, DirectiveBinding, VNode } from 'vue'
import App from "../src/App.vue"
import { formControlDirective } from 'reactive-vue-form'

const app = createApp(App);
app.use(formControlDirective);
app.mount('#app');
