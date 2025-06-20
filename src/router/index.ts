import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks'
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: () => import('@/views/TasksPage.vue'),
      meta: {
        title: '任務管理'
      }
    },
    {
      path: '/session-records',
      name: 'SessionRecords',
      component: () => import('@/views/SessionRecordsPage.vue'),
      meta: {
        title: '階段紀錄'
      }
    },
    // TODO: 排程管理
    // {
    //   path: '/schedule',
    //   name: 'Schedule',
    //   component: () => import('@/views/SchedulePage.vue'),
    //   meta: {
    //     title: '排程管理'
    //   }
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage.vue'),
      meta: {
        title: '頁面不存在'
      }
    }
  ]
})

// Navigation guard to set page title
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - SessionFlow`;
  }
});

export default router 