<template>
  <div class="flex justify-center items-center flex-col sns mt-8">
    <div class="flex justify-center items-center">
      <img class="size-20" alt="Weather logo" src="../assets/weather.png">
    </div>
    <h1 class="text-xl font-bold">Login</h1>
      <div class="login-form">
        <input type="text" placeholder="Enter Email" v-model="email"/>
        <input type="password" placeholder="Enter Password" v-model="password"/>
        <button class="login-btn" @click="login" v-if="!isLoggedin" :disabled="isLoading">
          <Loader v-if="isLoading"/>        
          Login
        </button>
        <P>Or</P>
      <div class="mt-3 mb-3">
        <div class="flex items-center justify-center">
          <button @click="signInWithGoogle" class="flex items-center justify-center bg-white dark:bg-gray-900 
            border border-gray-300 rounded-lg shadow-md px-6 py-2 
            text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full">
            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> 
              <title>Google-color</title> 
              <desc>Created with Sketch.</desc>
              <defs> </defs> 
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> 
              <g id="Color-" transform="translate(-401.000000, -860.000000)"> 
              <g id="Google" transform="translate(401.000000, 860.000000)"> 
              <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,
                13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,
                34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> 
              </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,
                2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,
                5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,
                14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> 
              </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,
                34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,
                47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,
                37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> 
              </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,
              19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,
              35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> 
            </path> </g> </g> </g> </svg>
            <span>SignIn with Google</span>
          </button>
        </div>
      </div>
      <p class="text-gray-600">
        Don't have an account? 
        <router-link to="/signup" class="text-blue-500 hover:text-blue-700 font-semibold underline ml-1">
          Sign Up here
        </router-link>
      </p>
        <button @click="logout" v-if="isLoggedin">Logout</button>
      </div>
  </div>
  <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import Loader from './Loader.vue';
import { supabase } from "@/clients/supabase";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { googleSdkLoaded } from 'vue3-google-login'
import { useUserStore } from '../stores/useUserStore'
import { storeToRefs } from 'pinia'

const email = ref("");
const password = ref("");
let isLoggedin = false;
const router = useRouter();
const errorMessage = ref("");
const isLoading = ref(false);
const userStore = useUserStore()
const { clientId } = storeToRefs(userStore)
const { fetchUserDataFrom } = userStore

const login = async() => {
  errorMessage.value = '';
  isLoading.value = true;
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error)
	{
		console.log(error);
    errorMessage.value = 'Invalid Credentials. Please Try Again!'
	}
	else
	{ isLoading.value = false;
    isLoggedin = true;
    console.log(data.session.access_token);
    sessionStorage.setItem('token', JSON.stringify(data.session.access_token) );
		console.log(data);
    router.push('/home');
	}
};

const signInWithGoogle = () => {
  googleSdkLoaded(google => {
    google.accounts.oauth2
      .initCodeClient({
        client_id: clientId.value,
        scope: 'email profile openid',
       redirect_uri: process.env.VUE_APP_REDIRECT_URL,
        callback: response => {
          if (response.code) {
            fetchUserDataFrom(response.code)
            console.log("success");
            console.log(response.code);
            sessionStorage.setItem('token', JSON.stringify(response.code) );
            router.push('/home');
          }
        },
      })
      .requestCode()
  })
}

const logout = async() => {
  const { error } = await supabase.auth.signOut();
  if(error){
    console.log(error);   
  }
  else{
    sessionStorage.removeItem('token');
    router.push('/');
    console.log("logout has been successful");
  }
}

</script>

<style>
h1{
  margin-top: 0%;
}
.login-form input{
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}

.login-btn {
  width: 300px;
  height: 40px;
  border: 1px solid #87CEEB;
  cursor: pointer;
  background: #87CEEB;
  color: #fff;
  margin-bottom: 3%;
}
</style>
