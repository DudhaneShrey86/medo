<template>
  <router-link :to="{name: 'TaskPage', params: { 'id': task._id }}">
    <task-card-base :task="task" @openedNote="emitOpenNote">
      <template v-slot:extra-content>
        <div class="flex-between">
          <div class="tags-div">
            <span class="tag" v-for="(tag, i) in task.tags" :class="{ 'red': tag.toLowerCase() == 'urgent', 'orange': tag.toLowerCase() == 'pending', 'green': tag.toLowerCase() == 'bug' }" :key="i">{{ tag }}</span>
          </div>
          <span class="time-span">{{ getTime(task.createdAt) }}</span>
        </div>
      </template>
    </task-card-base>
  </router-link>
</template>

<script>
import TaskCardBase from './TaskCardBase.vue'

export default {
  name: 'TaskCardDashboard',
  props: [ 'task' ],
  components: {
    TaskCardBase
  },
  methods: {
    emitOpenNote (tid) {
      this.$emit('openedNote', tid);
    },
    getTime (t) {
      var d = new Date(t);
      var currentDate = new Date();
      if(d.getDate() == currentDate.getDate()){
        return d.getHours + ":" + d.getSeconds();
      } else {
        return 'Yesterday';
      }
    }
  }
}
</script>

<style lang="scss">
.tags-div{
  display: flex;
  grid-gap: 5px;
  flex-wrap: nowrap;

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
    &.green {
      background: $green;
    }
  }
}
.time-span{
  font-size: 14px;
  @extend %dark-blue-text;
}
</style>