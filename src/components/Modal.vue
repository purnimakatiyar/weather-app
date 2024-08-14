<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="close">X</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Modal',
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(110, 104, 104, 0.131);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    position: relative;
    width: 80%;
    max-width: 500px;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 18px;
    cursor: pointer;
  }
  </style>
  