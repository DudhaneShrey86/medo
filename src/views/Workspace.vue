<template>
  <div id="workspace-page">
    <modal id="note-modal" ref="noteModal">
      <template v-slot:modal-content>
        <h6 id="task-title-heading"><span class="orange-text">Task:</span> <span class="dark-blue-text">{{ openedTask.title }}</span> </h6>
        <h6 id="task-description-heading" class="orange-text">Note:</h6>
        <p class="dark-blue-text" id="task-description" v-html="nl2br(openedTask.note)"></p>
      </template>
      <template v-slot:modal-footer>
        <div class="">
          <button class="grey-button" @click="closeNoteModal">Close</button>
        </div>
      </template>
    </modal>
    <router-link to="/create-task"><button id="mobile-add-button" class="circle-button green-icon-button"><Plus /></button></router-link>
    <select name="category-select" class="orange" id="category-select-workspace" v-model="currentCategoryID" @change="changeSelect">
      <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
    </select>
    <div id="main-workspace">
      <div id="tasks-remaining" class="task-list-divs">
        <div class="task-list-heading flex-between">
          <h6>Task Remaining</h6>
          <router-link to="/create-task"><button class="hide-on-small circle-button green-icon-button"><Plus /></button></router-link>
        </div>
        <div class="task-list-body">
          <h5 v-if="remainingTasks.length == 0" class="dark-blue-text">No remaining tasks, Good Work!</h5>
          <task-card-workspace v-else @statusChanged="changeTaskStatus" @openedNote="openNoteModal" v-for="task in remainingTasks" :key="task._id" :task="task" />
        </div>
      </div>
      <div id="tasks-done" class="task-list-divs">
        <div class="task-list-heading flex-between">
          <h6>Task Done</h6>
          <!-- <button class="circle-button green-icon-button"><Plus /></button> -->
        </div>
        <div class="task-list-body">
          <h5 v-if="completedTasks.length == 0" class="dark-blue-text">No completed tasks, Start Working Already!</h5>
          <task-card-workspace @statusChanged="changeTaskStatus" v-for="task in completedTasks" :key="task._id" :task="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Plus from 'vue-material-design-icons/Plus'
import TaskCardWorkspace from '../components/TaskCardWorkspace.vue'
import Modal from '../components/Modal.vue'
import { callMQLOpen, getMQL } from '@/utils/mql.util.js'

export default {
  name: 'Workspace',
  components: {
    Plus,
    TaskCardWorkspace,
    Modal
  },
  data () {
    return {
      currentCategoryID: '',
      categories: [],
      openedTask: {},
      tasks: [
        
      ]
    }
  },
  async created () {
    await this.getCategories();
    // get category id from query
    var c = this.$route.query.categoryID;
    if(c){
      this.currentCategoryID = c;
    } else {
      this.currentCategoryID = this.categories[0]._id;
    }
    await this.getTasks();
  },
  computed: {
    remainingTasks () {
      return this.tasks.filter((t) => {
        // if(t.isComplete){
        //   return t.isComplete == 0
        // } else {
        //   return true;
        // }
        if(t.isComplete == undefined){
          return true;
        } else {
          return t.isComplete == 0
        }
      })
    },
    completedTasks () {
      return this.tasks.filter((t) => {
        // if(t.isComplete){
        //   return t.isComplete == 1;
        // } else {
        //   return false;
        // }
        if(t.isComplete == undefined){
          return false;
        } else {
          return t.isComplete == 1
        }
      })
    },
  },
  methods: {
    async changeSelect () {
      await this.getTasks();
    },
    async getCategories () {
      // get categories from db
      const resp = await getMQL('ReadAllMedoCategories');
      if (resp) {
        this.categories = resp;
      }
    },
    async getTasks () {
      // get categories from db
      const resp = await callMQLOpen('ReadMedoTasksByCategory', {category_id: this.currentCategoryID});
      if (resp) {
        this.tasks = resp;
      } else {
        this.tasks = [];
      }
    },
    changeTaskStatus(checked, tid){
      var i = this.tasks.findIndex((t) => {
        return t._id == tid;
      });
      var status = 0;
      if(checked){
        status = 1;
      }
      var data = {
        isComplete: status,
        id: tid
      };
      var selectedTask = this.tasks[i];
      selectedTask.isComplete = status;
      new callMQLOpen('UpdateMedo_tasks', data);
    },
    openNoteModal (tid) {
      var i = this.tasks.findIndex((t) => {
        return t._id == tid
      })
      this.openedTask = this.tasks[i];
      this.$refs.noteModal.openModal();
    },
    closeNoteModal () {
      this.$refs.noteModal.closeModal();
    },
    nl2br(str, is_xhtml){
      if (typeof str === 'undefined' || str === null) {
        return '';
      }
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/buttons.scss';
@import '@/assets/css/select.scss';
@import '@/assets/css/modals.scss';

#category-select-workspace{
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
}
#main-workspace{
  @include grid-div($columns: 1fr, $gap: 30px);

  .task-list-divs{

    .task-list-heading{
      border-bottom: 1px solid $border-grey;
      h6{
        color: $dark-blue;
      }
    }
    .task-list-body{
      padding: 15px 5px;
      @include grid-div($columns: 1fr);
    }
  }
}

@media screen and (min-width: 768px) {
  #category-select-workspace{
    border: 0;
    width: auto;
    position: static;
  }
  #main-workspace{
    grid-template-columns: 1fr 1fr;
  }
}

</style>