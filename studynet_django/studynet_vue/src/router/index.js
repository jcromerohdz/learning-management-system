import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue')
    },
    {
      path: '/dashboard/my-account',
      name: 'myaccount',
      component: () => import('../views/dashboard/MyAccountView.vue')
    },
    {
      path: '/dashboard/create-course',
      name: 'createcourse',
      component: () => import('../views/dashboard/CreateCourseView.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/CoursesView.vue')
    },
    {
      path: '/courses/:slug',
      name: 'course',
      component: () => import('../views/CourseView.vue')
    },
    {
      path: '/authors/:id',
      name: 'author',
      component: () => import('../views/AuthorView.vue')
    }

  ]
})

export default router
