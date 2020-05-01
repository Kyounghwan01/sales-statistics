<template>
  <div class="floating-action-button" @click="$emit('click')">
    <p class="plus">+</p>
    <img class="edit" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png" />
  </div>
</template>

<style lang="scss" scoped>
.floating-action-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #f95454;
  position: fixed;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  box-shadow: 0 10px 20px -8px #f95454;
  z-index: 100;

  &:hover {
    background: #343a40;
    box-shadow: 0 10px 20px -8px #343a40;

    .plus {
      animation: plus-in 0.15s linear;
      animation-fill-mode: forwards;
    }

    .edit {
      animation: edit-in 0.2s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
  }

  .plus {
    color: white;
    position: absolute;
    top: 0px;
    display: block;
    bottom: 0;
    left: 2px;
    right: 0;
    text-align: center;
    padding: 0;
    margin: 0;
    line-height: 54px;
    font-size: 40px;
    font-weight: 200;
    -webkit-animation: plus-out-data-v-e41e3df0 0.3s;
    animation: plus-out-data-v-e41e3df0 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .edit {
    position: absolute;
    top: 0;
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    opacity: 0;
    margin: auto;
    line-height: 65px;
    transform: rotateZ(-70deg);
    transition: all 0.3s;
    animation: edit-out 0.3s;
  }
}

@keyframes edit-in {
  from {
    opacity: 0;
    transform: rotateZ(-70deg);
  }
  to {
    opacity: 1;
    transform: rotateZ(0deg);
  }
}

@keyframes edit-out {
  from {
    opacity: 1;
    transform: rotateZ(0deg);
  }
  to {
    opacity: 0;
    transform: rotateZ(-70deg);
  }
}

@keyframes plus-in {
  from {
    opacity: 1;
    transform: rotateZ(0deg);
  }
  to {
    opacity: 0;
    transform: rotateZ(180deg);
  }
}

@keyframes plus-out {
  from {
    opacity: 0;
    transform: rotateZ(180deg);
  }
  to {
    opacity: 1;
    transform: rotateZ(0deg);
  }
}
</style>
