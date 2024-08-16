<template>
    <img class="logo" alt="Weather logo" src="../assets/weather.png">
    <h1>Login</h1>
    <div class="register">
      <input type="text" placeholder="Enter Email" />
      <input type="password" placeholder="Enter Password" />
      <button>Login</button>
      <p>
      <router-link to="/signup">Go to SignUp</router-link>
      </p>
</div>
</template>

<script>
export default {
  name: 'Login'
}
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
.register button{
  width: 320px;
  height: 40px;
  border: 1px solid #87CEEB;
  cursor: pointer;
  background: #87CEEB;
  color: #fff;
}
</style>
