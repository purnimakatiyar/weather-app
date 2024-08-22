import Home from '../components/Home.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'
import {createRouter, createWebHistory} from 'vue-router'
import { useRouter } from 'vue-router';

// const guardMyRoute = (to, from, next) => {
//   const isAuthenticated = !!sessionStorage.getItem('access_token'); // Check if the user is authenticated

//   if (isAuthenticated) {
//     next(); // Allow access to the route
//   } else {
//     next('/login'); // Redirect to the login page
//   }
// };

const routes = [
  {
    name:"Home",
    component:Home,
    path: "/home",
    // beforeEnter : guardMyRoute,
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
    path: "/:notFound",
    component: NotFound,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
