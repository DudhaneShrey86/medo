<template>
  <div id="create-task-page">
    <div id="create-task-div">
      <h6 class="dark-blue-text">Creating a New Task</h6>
      <form action="" @submit.prevent="submitForm">
        <input-box id="title" labelText="Title" :required="true" :value="currentTask.title" />
        <div class="input-field">
          <label for="category">Category</label>
          <select name="category_id" id="category_id" required :value="selectedCategory._id">
            <option value="" selected disabled>Select A Category</option>
            <option v-for="category in categories" :key="category._id" :value="category._id" >{{ category.name }}</option>
          </select>
        </div>
        <textarea-box id="description" labelText="Description" :required="true" :value="currentTask.description" />
        <textarea-box id="note" labelText="Note" :value="currentTask.note" />
        <!-- tags input -->
        <div class="input-field">
          <label for="tags">Tags</label>
          <input type="text" name="tags" id="tags" v-model="tagValue" @keydown="addTag">
          <small class="dark-blue-text">Type and press 'TAB'</small>
          <div class="tags-div">
            <p class="tag" v-for="(tag, i) in tags" :key="i" :class="{red: tag.toLowerCase() == 'urgent', green: tag.toLowerCase() == 'bug'}">
              <span>{{ tag }}</span>
              <span @click="removeTag(i)"><Close class="icon" /></span>
            </p>
          </div>
        </div>
        <div class="button-div">
          <button class="orange-button">Create</button>
          <button type="button" class="outlined-button">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputBox from '../components/InputBox.vue'
import TextareaBox from '../components/TextareaBox.vue'
import Close from 'vue-material-design-icons/Close'
import { callMQLOpen, getMQL } from '@/utils/mql.util.js'
export default {
  components: { InputBox, TextareaBox, Close },
  name: 'CreateTask',
  data () {
    return {
      selectedCategory: {},
      categories: [

      ],
      tagValue: '',
      tags: [],
      currentTask: {}
    }
  },
  async created () {
    await this.getCategories();
    
    var c = this.$route.query.categoryID;
    if(c){
      var i = this.categories.findIndex((category) => {
        return category._id == c;
      });
      this.selectedCategory = this.categories[i];
    }
    // check for id in query
    var taskID = this.$route.query.taskID;
    if(taskID){
      // editing task
      const resp = await new callMQLOpen('ReadMedo_tasks', {_id: taskID});
      if(resp){
        this.currentTask = resp[0];
        this.selectedCategory = this.categories.find((c) => {
          return c._id == this.currentTask.category_id;
        });
        this.tags = this.currentTask.tags;
      }
    }
  },
  methods: {
    async getCategories () {
      // get categories from db
      const resp = await getMQL('ReadAllMedoCategories');
      if (resp) {
        this.categories = resp;
      }
    },
    submitForm (e) { 
      var form = e.target;
      var formData = new FormData(form);
      var data = {};
      for (let [k, v] of formData) {
        data[k] = v;
      }
      data['tags'] = this.tags;
      let resp;
      if(this.currentTask._id != undefined){
        data['id'] = this.currentTask._id;
        resp = new callMQLOpen('UpdateMedo_tasks', data);
      } else {
        resp = new callMQLOpen('CreateMedo_tasks', data);
      }
      if(resp){
        this.$router.push({name: 'Dashboard'});
      }
    },
    addTag(e) {
      if(e.keyCode == 9){
        event.preventDefault();
        this.tags.push(this.tagValue);
        this.tagValue = '';
      }
    },
    removeTag (i) {
      this.tags.splice(i, 1);
    }
  }

}
</script>

<style lang="scss">
@include padding-dynamic(15 40, 0);
@import '@/assets/css/buttons.scss';

#create-task-div{
  max-width: 400px;
  margin: 0 auto;

  select{
    padding: 15px;
    border-radius: $input-radius;
    background: white;
    font-size: 1rem;
    border: none;
  }
  select:focus{
    outline: 2px solid $orange;
  }
  .button-div{
    justify-content: flex-start;
    padding: 10px 0;
  }

  .tags-div{
    @include flex-div($justify: flex-start, $gap: 10px);
    padding: 10px 0;

    .tag{
      font-size: 12px;
      font-weight: 500;
      padding: 3px 5px;
      margin: 0;
      border-radius: 5px;
      background: $dark-blue;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      grid-gap: 5px;

      .icon{
        cursor: pointer;
        svg{
          width: 16px;
          height: 16px;
        }
      }
      
      &.red{
        background: $red;
      }
      &.orange{
        background: $orange;
      }
      &.green {
        background: $green;
      }
    }
  }
}
</style>