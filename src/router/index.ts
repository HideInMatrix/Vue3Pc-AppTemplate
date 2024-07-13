import { createRouter, createWebHistory } from "vue-router";
function getRoutes() {
  const routes = [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/test",
      name: "test",
      meta: {
        title: "test",
        keepAlive: true,
      },
      component: () => import("../views/test.vue"),
    },
    {
      path: "/home",
      name: "home",
      meta: {
        title: "主页",
        keepAlive: true,
      },
      component: () => import("../views/home.vue"),
    },
  ];
  /**
   * 如果要对 routes 做一些处理，请在这里修改
   */
  return routes;
}
const router = createRouter({
  history: createWebHistory(),
  routes: getRoutes(),
});
// router.beforeEach((to, from, next) => {
//  next()
// })
export default router;
