<template>
  <div :id="category.name" class="category-section-div">
    <div class="category-header flex-between hide-on-small-flex">
      <h6 class="bolder-weight">{{ category.name }}</h6>
      <router-link :to="{path: '/create-task', query: {categoryID: category._id}}"><button class="circle-button green-icon-button"><Plus /></button></router-link>
    </div>
    <div class="category-body">
      <task-card-dashboard v-for="task in tasks" :key="task.id" :task="task" @openedNote="emitOpenNoteModal" />
    </div>
  </div>
</template>

<script>
import Plus from 'vue-material-design-icons/Plus'
import TaskCardDashboard from './TaskCardDashboard.vue';
import { callMQLOpen } from '@/utils/mql.util.js'

export default {
  name: 'CategorySection',
  components: {
    Plus,
    TaskCardDashboard
  },
  props: [ 'category' ],
  data () {
    return {
      tasks: [
        // { 
        //   _id: '24123b21',
        //   category_id: 'da212213',
        //   title: 'Some task to be done ASAP',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n Impedit, aliquid? Molestias, \n quasi autem quibusdam porro nisi vitae debitis cum ipsum iure \n alias nihil accusantium? Obcaecati cupiditate consectetur ratione odit atque.',
        //   note: 'This is a big note with multiple lines of text, IDK how to do it yet \n but lets see!',
        //   tags: [ 'Urgent', 'Backend' ],
        //   created_at: new Date('2021-09-09 09:30'),
        //   completed_at: new Date('2021-09-09 11:45'),
        //   isComplete: 0,
        // }
      ]
    }
  },
  async created () {
    await this.getTasks();
    this.arrangeTasks();
  },
  methods: {
    async getTasks(){
      const resp = await callMQLOpen('ReadMedoTasksByCategory', {category_id: this.category._id})
      if(resp){
        this.tasks = resp;
      }
    },
    arrangeTasks () {
      // arrange tasks isComplete
      this.tasks.sort((a, b) => {
        return a.isComplete > b.isComplete;
      });
    },
    emitOpenNoteModal (tid) {
      var i = this.tasks.findIndex((element) => {
        return element._id == tid;
      });
      this.$emit('openedNote', this.tasks[i]);
    }
  }
}
</script>

<style lang="scss">
.category-section-div{
  display: none;

  &:nth-child(1){
    display: block;
  }

  .category-header{
    border-bottom: 1px solid $border-grey;

    h6{
      @extend %orange-text;
      // margin-bottom: 1.15rem;
    }
  }

  .category-body{
    display: flex;
    flex-direction: column;
    padding: 15px 5px;
    grid-gap: 15px;
    overflow-y: auto;

    scrollbar-width: thin;
    /* width */
    &::-webkit-scrollbar {
      width: 3px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #d3d3d3;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $dark-blue;
      border-radius: 20px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
@media screen and (min-width: 768px) {
  .category-section-div{
    display: block;

    .category-body{
      max-height: 50vh;
    }
  }
}
</style>