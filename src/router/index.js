import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Me from '../views/Me.vue'
import NoteDetail from '../views/NoteDetail.vue'
// 【新增】
import Video from '../views/Video.vue'
import Messages from '../views/Messages.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { showTabBar: true }
  },
  // 【新增】视频页路由
  {
    path: '/video',
    name: 'Video',
    component: Video,
    meta: { showTabBar: true }
  },
  // 【新增】消息页路由
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
    meta: { showTabBar: true }
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
    meta: { showTabBar: true }
  },
  {
    path: '/note/:id',
    name: 'NoteDetail',
    component: NoteDetail,
    meta: { showTabBar: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router