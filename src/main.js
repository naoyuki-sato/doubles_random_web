
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Vuetifyのデフォルトのスタイリングが適用
import 'vuetify/styles'
// VuetifyのcreateVuetify関数をインポート
import { createVuetify } from 'vuetify'
// Vuetifyのコンポーネントが使用できる
import * as components from 'vuetify/components'
// Vuetifyのディレクティブが使用できる
import * as directives from 'vuetify/directives'
// インポートしたコンポーネントとディレクティブを設定としてVueインスタンスを生成
const vuetify = createVuetify({
  components,
  directives,
})

import '@mdi/font/css/materialdesignicons.css'

createApp(App).use(vuetify).mount('#app')

