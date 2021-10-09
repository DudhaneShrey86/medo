<template>
  <div id="dashboard">
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
    <h6 class="dark-blue-text hide-on-small">Todays Tasks</h6>
    <router-link to="/create-task"><button id="mobile-add-button" class="circle-button green-icon-button"><Plus /></button></router-link>
    <select name="category-select" class="orange" id="category-select">
      <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
    </select>
    <div id="categories-container">
      <category-section v-for="category in categories" :key="category.id" :category="category" @openedNote="openNoteModal" />
    </div>
  </div>
</template>

<script>
import CategorySection from '../components/CategorySection.vue'
import Plus from 'vue-material-design-icons/Plus'
import Modal from '../components/Modal.vue'
import { getMQL } from '@/utils/mql.util.js'
export default {
  name: 'Dashboard',
  components: {
    CategorySection,
    Modal,
    Plus
  },
  data () {
    return {
      categories: [],
      openedTask: {}
    }
  },
  async created () {
    // fetch all categories
    await this.getCategories();
  },
  methods: {
    async getCategories () {
      // get categories from db
      const resp = await getMQL('ReadAllMedoCategories');
      if (resp) {
        this.categories = resp;
      }
    },
    openNoteModal (task) {
      this.openedTask = task;
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
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/css/buttons.scss';
@import '@/assets/css/select.scss';
@import '@/assets/css/modals.scss';

#category-select{
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
}

@media screen and (min-width: 768px) {
  #category-select{
    display: none;
  }
  #categories-container{
    @include grid-div($columns: 1fr 1fr, $gap: 30px);
  }
}

@media screen and (min-width: 992px){
  #categories-container{
    grid-template-columns: 1fr 1fr 1fr;
  }
}

</style>