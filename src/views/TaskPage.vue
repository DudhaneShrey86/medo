<template>
  <div id="task-details-page">
    <modal id="delete-modal" :isConfirmModal="true" ref="deleteModal" @confirmSelected="deleteTask">
      <template v-slot:modal-content>
        <div class="dark-blue-text">
          <h5>Are you sure you want to delete the task?</h5>
          <h6 class="red-text">This action cannot be undone</h6>
        </div>
      </template>
      <template v-slot:modal-footer>
        
      </template>
    </modal>
    <div id="page-header">
      <p class="dark-blue-text" id="breadcrumb"><router-link to="/">Home</router-link> > <router-link :to="{path: '/workspace', query: { categoryID: task.category_id }}">{{ category.name }}</router-link> > <span class="orange-text bold-weight">{{ task.title }}</span> </p>
      <h6 class="dark-blue-text hide-on-small">Task Details</h6>
    </div>
    <div id="task-details-card">
      <div class="card">
        <div class="card-content">
          <h5 class="bold-weight task-title">{{ task.title }}</h5>
          <div class="tags-div">
            <span class="tag" v-for="(tag, i) in task.tags" :class="{ 'red': tag.toLowerCase() == 'urgent', 'orange': tag.toLowerCase() == 'pending', 'green': tag.toLowerCase() == 'bug' }" :key="i">{{ tag }}</span>
          </div>
          <div class="details-div">
            <p class="details-heading">Task Description:</p>
            <p class="details-text" v-html="nl2br(task.description)"></p>
          </div>
          <div class="details-div">
            <p class="details-heading">Note:</p>
            <p class="details-text task-note" v-html="nl2br(task.note)"></p>
          </div>
          <div class="details-div" id="category-div">
            <p class="details-heading">Category: {{ category.name }}</p>
          </div>
          <div class="details-div time-div">
            <div>
              <p class="details-heading">Created At:</p>
              <p class="details-text">{{ printTime(task.createdAt) }}</p>
            </div>
            <div v-if="task.isComplete == 1">
              <p class="details-heading">Completed At:</p>
              <p class="details-text">{{ printTime(task.createdAt) }}</p>
            </div>
          </div>
          <div class="button-div">
            <router-link :to="{path: '/create-task', query: {taskID: task._id}}"><button class="icon-button green-button"><Pencil /></button></router-link>
            <button class="icon-button red-button" @click="openDeleteModal"><Delete /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pencil from 'vue-material-design-icons/Pencil'
import Delete from 'vue-material-design-icons/Delete'
import Modal from '../components/Modal.vue'
import { callMQLOpen } from '@/utils/mql.util.js'

export default {
  name: 'TaskPage',
  props: ['id'],
  components: {
    Pencil,
    Delete,
    Modal
  },
  data () {
    return {
      task: {
         createdAt: 1632480163,
      },
      category: {}
    }
  },
  async created () {
    // get task from id passed
    await this.getTask();
    await this.getCategory();
  },
  methods: {
    async getTask () {
      const resp = await callMQLOpen('ReadMedo_tasks', {_id: this.id});
      this.task = resp[0];
    },
    async getCategory () {
      const resp = await callMQLOpen('ReadMedo_categories', {_id: this.task.category_id});
      this.category = resp[0];
    },
    async deleteTask () {
      const resp = await callMQLOpen('DeleteMedo_tasks', {_id: this.task._id});
      if(resp){
        this.$router.push({path: '/workspace', query: { 'categoryID': this.category._id }});
      }
    },
    nl2br(str, is_xhtml){
      if (typeof str === 'undefined' || str === null) {
        return '';
      }
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    },
    printTime (t) {
      var d = new Date(t);
      return d.getHours() + ":" + d.getMinutes();
    },
    // getDateString(d){
    //   return d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    // },
    openDeleteModal () {
      this.$refs.deleteModal.openModal();
    },
    closeDeleteModal () {
      this.$refs.deleteModal.closeModal();
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/buttons.scss';

#breadcrumb{
  a{
    &:hover{
      text-decoration: underline;
    }
  }
}
#task-details-card{
  max-width: 500px;
  margin: 0 auto;
  
  .card{
    background: transparent;
    box-shadow: none;
  }
  .card-content{
    padding: 0px;

    .task-title{
      letter-spacing: 0.04rem;
      margin: 5px 0px 10px 0px;
    }

    .tags-div{
      display: flex;
      grid-gap: 5px;
      flex-wrap: nowrap;
      margin-bottom: 5px;

      .tag{
        font-size: 12px;
        font-weight: 500;
        padding: 3px 5px;
        border-radius: 5px;
        background: $dark-blue;
        color: white;
        
        &.red{
          background: $red;
        }
        &.orange{
          background: $orange;
        }
        &.green{
          background: $green;
        }
      }
    }
    .details-div{
      padding: 8px 0;
      .details-heading{
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        margin: 2px 0;
        @extend %orange-text;
      }
      .details-text{
        font-size: 14px;
        margin: 0;
        line-height: 1.2rem;
        @extend %dark-blue-text;
      }
      .task-note{
        a{
          text-decoration: underline;
          &:hover{
            color: $orange;
          }
        }
      }
    }
    #category-div{
      p{
        color: $dark-blue;
      }
    }
    .time-div{
      display: flex;

      &>div{
        flex: 1;
      }
      .time-span{
        font-size: 14px;
        @extend %dark-blue-text;
      }
      .details-text{
        font-weight: 500;
      }
    }

    .button-div{
      margin-top: 10px;
      grid-gap: 10px;
      justify-content: flex-start;
    }

    .green-button{
      background: $green;

      &:hover{
        background: darken($green, 8);
      }
    }
    .red-button{
      background: $red;
      
      &:hover{
        background: darken($red, 8);
      }
    }
  }
}
@media screen and (min-width: 768px) {
  #task-details-card{
    .card{
      background: white;
      box-shadow: 0px 2px 10px rgba($dark-blue, 0.2);
    }
    .card-content{
      padding: 20px;
    }
  }
}
</style>