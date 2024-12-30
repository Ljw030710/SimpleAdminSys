import { createPinia } from 'pinia'
import { user } from './user';
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist) // 使用插件

export { user };
export default store;
