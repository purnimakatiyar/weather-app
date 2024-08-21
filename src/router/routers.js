import Home from '../components/Home.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    name:"Home",
    component:Home,
    path: "/home",
  },
  {
    name:"SignUp",
    component:SignUp,
    path: "/signup",
  },
  {
    name:"Login",
    component:Login,
    path: "/",
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
