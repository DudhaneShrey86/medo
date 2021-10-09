<template>
  <div class="input-field">
    <label :for="id">{{ labelText }}</label>
    <textarea :name="id" :id="id" :placeholder="placeholder" :required="required" :value="value"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextareaBox',
  props: {
    id: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      // nothing
    },
  }
}
</script>

<style lang="scss">
.input-field{
  margin: 15px 0;

  >*{
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  label{
    margin-bottom: 5px;
    font-weight: 700;
    color: $dark-blue;
    font-size: 0.9rem;
    letter-spacing: 0.02rem;
  }
  textarea{
    padding: 15px;
    resize: none;
    height: 150px;
    border-radius: $input-radius;
    background: white;
    font-size: 1rem;
    border: none;
  }
  textarea:focus{
    outline: 2px solid $orange;
  }
}
</style>