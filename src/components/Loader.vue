<template>
  <div class="loader"></div>
</template>

<style>
.loader {
  width: 50px;
  padding: 8px;
  margin-top: 40%;
  margin-left: 40%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #87CEEB;
  --_m:
    conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}

@keyframes l3 {
  to { transform: rotate(1turn); }
}

@media only screen and (max-width: 768px) {
  .weather-card {
    margin-left: 0%;
  }
}
</style>
