<script>

import VueI18n from 'vue-i18n';
import Vue from "vue";
Vue.use(VueI18n)

export default new VueI18n ({
  locale: 'zh',
  messages: {
    'zh': require('./lang/zh'),
    'en': require('./lang/en')
  }
})

</script>

<style scoped>

</style>