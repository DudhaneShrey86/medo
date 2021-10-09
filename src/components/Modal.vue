<template>
  <div class="modal" :class="{active: isActive, confirmModal: isConfirmModal}" :id="id">
    <div class="modal-backdrop" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-cross" @click="closeModal">
        <Close />
      </div>
      <slot name="modal-content"></slot>
      <div class="modal-footer">
      <template v-if="isConfirmModal">
        <div class="button-div">
          <button class="red-button" @click="actionConfirm(true)">Delete</button>
          <button class="grey-button" @click="actionConfirm(false)">Cancel</button>
        </div>
      </template>
      <slot name="modal-footer"></slot>
    </div>
    </div>
  </div>
</template>

<script>
import Close from 'vue-material-design-icons/Close'
export default {
  name: 'Modal',
  props: {
    id: {
      type: String,
      default: ''
    },
    isConfirmModal: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Close
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    openModal () {
      this.isActive = true
    },
    closeModal () {
      this.isActive = false
    },
    actionConfirm (b) {
      this.closeModal()
      this.$emit('confirmSelected', b)
    }
  }
}
</script>

<style lang="scss">
.modal{
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  &.active{
    display: flex;
  }
  &.confirmModal{
    text-align: center;
  }
  .modal-backdrop{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 11;
    background: rgba(#000, 0.2);
  }

  .modal-content{
    margin: 15px;
    background: white;
    padding: 20px;
    width: 400px;
    position: relative;
    z-index: 12;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba($dark-blue, 0.3);

    .red-button{
      @extend %button;
      @extend %full-width-button;
      @extend %white-text;
      background: $red;
      &:hover{
        background: darken($red, 8);
      }
    }

    .modal-cross{
      text-align: right;

      span{
        color: $red;
        cursor: pointer;
      }
    }
    #task-description{
      a{
        text-decoration: underline;
        &:hover{
          color: $orange;
        }
      }
    }
    .modal-footer{
      margin-top: 30px;
      text-align: center;

      button{
        max-width: 120px;
      }
    }
  }
}

</style>