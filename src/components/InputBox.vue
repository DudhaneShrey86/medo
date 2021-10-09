<template>
  <div class="input-field">
    <label :for="id">{{ labelText }}</label>
    <input :type="type" :name="id" :id="id" :placeholder="placeholder" :required="required" :value="value">
  </div>
</template>

<script>
export default {
  name: 'InputBox',
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
  input{
    padding: 15px;
    border-radius: $input-radius;
    background: white;
    font-size: 1rem;
    border: none;
  }
  input:focus{
    outline: 2px solid $orange;
  }
}
</style>