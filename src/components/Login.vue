<template>
  <div class="flex justify-center items-center flex-col sns mt-8">
    <div class="flex justify-center items-center">
      <img class="size-20" alt="Weather logo" src="../assets/weather.png">
    </div>
    <h1 class="text-xl font-bold">Login</h1>
      <div class="login-form">
        <input type="text" placeholder="Enter Email" v-model="email"/>
        <input type="password" placeholder="Enter Password" v-model="password"/>
        <button @click="login" v-if="!isLoggedin" >Login</button>
        <p>
        <router-link to="/signup">Go to SignUp</router-link>
        </p>
        <button @click="logout" v-if="isLoggedin">Logout</button>
      </div>
  </div>
  <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { supabase } from "@/clients/supabase";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
let isLoggedin = false;
const router = useRouter();
const errorMessage = ref("");
const login = async() => {
  errorMessage.value = '';
  console.log("run");
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
	{isLoggedin = true;
		console.log(data);
    router.push('/home');
	}
};

const logout = async() => {
  const { error } = await supabase.auth.signOut();
  if(error){
    console.log(error);   
  }
  else{
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

.login-form button {
  width: 320px;
  height: 40px;
  border: 1px solid #87CEEB;
  cursor: pointer;
  background: #87CEEB;
  color: #fff;
}
</style>
