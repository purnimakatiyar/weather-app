import Home from '../components/Home.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import Maps from '../components/Maps.vue'
import NotFound from '../components/NotFound.vue'
import {createRouter, createWebHistory} from 'vue-router'
import { useRouter } from 'vue-router';

const guardMyRoute = (to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('token'); // Check if the user is authenticated
console.log("guard")
  if (isAuthenticated) {
    console.log('in if')
    next(); // Allow access to the route
  } else {
    console.log('in else');
    next('/'); // Redirect to the login page
  }
};

const routes = [
  {
    name:"Home",
    component:Home,
    path: "/home",
    beforeEnter : guardMyRoute,
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
  {
    name:"Maps",
    component:Maps,
    path: "/maps",
  },
  {
    path: "/:notFound",
    component: NotFound,
  },
  
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
