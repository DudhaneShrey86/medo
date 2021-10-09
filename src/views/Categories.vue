<template>
  <div id="categories-page">
    <form action="" @submit.prevent="submitForm">
      <modal id="create-modal" ref="createModal">
        <template v-slot:modal-content>
          <h5 class="dark-blue-text">Creating New Category</h5>
          <input-box id="name" labelText="Category Name" :required="true" />
        </template>
        <template v-slot:modal-footer>
          <div class="button-div">
            <button class="orange-button" type="submit">Create</button>
            <button class="grey-button" type="button" @click="closeCreateModal">Close</button>
          </div>
        </template>
      </modal>
    </form>
    <modal id="delete-modal" :isConfirmModal="true" ref="deleteModal" @confirmSelected="deleteCategory">
      <template v-slot:modal-content>
        <div class="dark-blue-text">
          <h5>Are you sure you want to delete the category - {{ currentCategory.name }}?</h5>
          <h6 class="red-text">This action cannot be undone</h6>
        </div>
      </template>
      <template v-slot:modal-footer>
        
      </template>
    </modal>
    <button id="mobile-add-button" class="circle-button green-icon-button" @click="openCreateModal"><Plus /></button>
    <div id="page-header" class="flex-between">
      <h5 class="dark-blue-text normal-weight">Total <span class="bolder-weight orange-text">3</span> categories</h5>
      <button class="hide-on-small circle-button green-icon-button" @click="openCreateModal"><Plus /></button>
    </div>
    <div id="table-div">
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Active Tasks</th>
            <th>Completed Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, i) in categories" :key="category._id">
            <td>{{i + 1}}</td>
            <td><router-link :to="{path: '/workspace', query: { categoryID: category._id }}" class="underlined">{{ category.name }}</router-link></td>
            <td>{{ category.activeTasks }}</td>
            <td>{{ category.completedTasks }}</td>
            <td class="buttons-div">
              <button class="icon-button green-button"><Pencil /></button>
              <button class="icon-button red-button" type="submit" @click="openDeleteModal(category)"><Delete /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Plus from 'vue-material-design-icons/Plus'
import Pencil from 'vue-material-design-icons/Pencil'
import Delete from 'vue-material-design-icons/Delete'
import Modal from '../components/Modal.vue'
import InputBox from '../components/InputBox.vue'
import { callMQLOpen, getMQL } from '@/utils/mql.util.js'

export default {
  name: 'Categories',
  components: {
    Plus,
    Pencil,
    Delete,
    Modal,
    InputBox
  },
  data () {
    return {
      categories: [],
      currentCategory: {}
    }
  },
  async created () {
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
    async deleteCategory (confirmed) {
      if(confirmed){
        const resp = await callMQLOpen('DeleteMedo_categories', {_id: this.currentCategory._id})
        if(resp){
          await this.getCategories();
        }
      }
    },
    openCreateModal () {
      this.$refs.createModal.openModal();
    },
    closeCreateModal () {
      this.$refs.createModal.closeModal();
    },
    openDeleteModal (category) {
      this.currentCategory = category;
      this.$refs.deleteModal.openModal();
    },
    closeDeleteModal () {
      this.$refs.deleteModal.closeModal();
    },
    async submitForm (e) {
      var form = e.target;
      var formData = new FormData(form);
      var formValid = true;
      var data = {}
      for (let [k, v] of formData){
        if(v == ''){
          formValid = false;
          break;
        } else {
          data[k] = v;
        }
      }
      if(formValid){
        const resp = await callMQLOpen('CreateMedo_categories', data)
        console.log(resp);
        await this.getCategories();
        this.closeCreateModal();
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/buttons.scss';
.modal{
  input{
    background: $light-blue;
  }
  &#create-modal{
    .button-div{
      justify-content: flex-start;
    }
  }
}
#table-div{
  overflow: auto;

  table {
    width: 100%;
    // border: 1px solid $border-grey;
    min-width: 600px;
    text-align: left;
    border-collapse: collapse;

    thead{
      font-family: 'Nunito', sans-serif;
      font-size: 1.15rem;

      th{
        font-weight: 600;
        padding: 10px;
        border-bottom: 1px solid $border-grey;
      }
    }
    tbody{
      tr{
        td{
          border-bottom: 1px solid $border-grey;
          padding: 7px 10px;

          .underlined{
            font-weight: 500;
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
      .buttons-div{
        @include flex-div($justify: flex-start, $gap: 10px);
      }
    }
  }
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
</style>