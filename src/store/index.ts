// pinia数据持久化存储
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
// 第一个参数是应用程序中 store 的唯一 id
const store = createPinia();
store.use(
  createPersistedState({
    serializer: {
      // 指定参数序列化器
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  })
);
export default store;
