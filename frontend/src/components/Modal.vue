<i18n>
{
  "he":{
    "close": "סגור"
  },
  "en": {
    "close": "Close"
  }
}
</i18n>

<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('toggleModal', null)">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-slot">
            <slot></slot>
          </div>
          <button @click="$emit('toggleModal', null)">{{$t('close')}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    handleEscape({ key }) {
      if (key === "Escape") this.$emit("toggleModal", null);
    }
  },
  created() {
    document.addEventListener("keyup", this.handleEscape);
  },
  destroyed() {
    document.removeEventListener("keyup", this.handleEscape);
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 92vw;
  max-width: 650px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-slot {
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
button {
  font-size: 1.2rem;
}
</style>

