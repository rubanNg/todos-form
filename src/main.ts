import { App as Vue, createApp, DirectiveBinding, VNode } from 'vue'
import App from "../src/App.vue"
import Control from "../src/Control.vue"
import Group from "../src/Group.vue"
import { formControlDirective } from 'reactive-vue-form'

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('javascript', javascript);

const app = createApp(App);

app.component("control", Control);
app.component("group", Group)


app.use(hljsVuePlugin)
app.use(formControlDirective);
app.mount('#app');


