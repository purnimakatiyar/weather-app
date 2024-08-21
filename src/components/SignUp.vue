<template>
  <div class="flex justify-center items-center flex-col sns mt-8">
    <div class="flex justify-center items-center">
      <img class="size-20" alt="Weather logo" src="../assets/weather.png">
    </div>
    <h1 class="text-xl font-bold">Signup</h1>
  <div class="register">
    <input type="text" placeholder="Enter Name" />
    <input type="text" placeholder="Enter Email" v-model="email"/>
    <input type="password" placeholder="Enter Password" v-model="password"/>
    <button @click="createAccount">Sign Up</button>
    <p>
    <router-link to="/login">Go to Login</router-link>
    </p>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../clients/supabase';

const email = ref('');
const password = ref('');

const createAccount = async() => {
  console.log("I am in signup");
 const { data, error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value
 });
if (error){
  console.log(error);
}
else{
  console.log(data);
}
};

</script>

<style>
.logo{
  width:12%;
}
h1{
  margin-top: 0%;
}
.register input{
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}

.register button {
  width: 320px;
  height: 40px;
  border: 1px solid #87CEEB;
  cursor: pointer;
  background: #87CEEB;
  color: #fff;
}
</style>
