<template>
  <label>
    <task-card-base :isWorkspaceCard="true" :task="task" @openedNote="emitOpenNote">
      <template v-slot:checkbox-slot>
        <input type="checkbox" :value="task._id" :checked="task.isComplete == 1" @change="emitStatusChange($event, task._id)">
      </template>
    </task-card-base>
  </label>
</template>

<script>
import TaskCardBase from './TaskCardBase.vue';

export default {
  name: 'TaskCardWorkspace',
  props: [ 'task' ],
  components: {
    TaskCardBase
  },
  methods: {
    emitOpenNote(tid){
      this.$emit('openedNote', tid);
    },
    emitStatusChange(event, tid){
      this.$emit('statusChanged', event.target.checked, tid);
    }
  }
}
</script>

<style lang="scss">
label{
  .task-flex-container{
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-gap: 15px;
    align-items: flex-start;
    
    input{
      margin-top: 5px;
    }
    
  }

}
</style>