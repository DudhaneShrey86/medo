<template>
  <div class="card task-card" :class="{'completed': task.isComplete == 1}" :data-complete="task.isComplete">
    <div class="card-content">
      <div class="task-flex-container">
        <slot name="checkbox-slot">

        </slot>
        <div>
          <div class="task-heading flex-between">
            <p>{{ task.title }}</p>
            <span v-if="task.isComplete == 1" class="green-text" :hidden="isWorkspaceCard" ><Check /></span>
            <span v-else-if="!!task.note" class="dark-blue-text" @click.prevent="emitOpenNote(task._id)"><ClipboardText /></span>
          </div>
          <div class="task-body">
            <div class="task-description">
              <p>{{ textCut(task.description) }}</p>
              <router-link v-if="isWorkspaceCard" :to="{name: 'TaskPage', params: { 'id': task._id }}" class="task-link"><ArrowRight /></router-link>
            </div>
            <slot name="extra-content">

            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardText from 'vue-material-design-icons/ClipboardText'
import ArrowRight from 'vue-material-design-icons/ArrowRight'
import Check from 'vue-material-design-icons/Check'
export default {
  name: 'TaskCardBase',
  props: {
    task: {
      type: Object
    },
    isWorkspaceCard: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ClipboardText,
    Check,
    ArrowRight
  },
  methods: {
    nl2br(str, is_xhtml){
      if (typeof str === 'undefined' || str === null) {
        return '';
      }
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    },
    textCut (t) {
      t = t.substr(0, 35) + '...';
      return t
    },
    emitOpenNote (tid) {
      this.$emit('openedNote', tid);
    }
  }
}
</script>

<style lang="scss">
.task-card{
  z-index: 1;
  transition: all 0.2s ease;

  &.completed {
    background: $light-white;

    .task-heading, .task-description{
      text-decoration: line-through;
    }

    .green-text{
      color: $green;
    }
  }

  &:hover{
    box-shadow: 0px 3px 8px rgba($dark-blue, 0.3);
    z-index: 2;
  }
}
.task-heading{
  p{
    margin: 0;
  }
}
.task-body{
  .task-description{
    font-size: 14px;
    @extend %dark-blue-text;
    @include flex-div($justify: space-between);

    p{
      margin: 5px 0;
    }
    .task-link{
      transform: translateX(0px);
      transition: all 0.2s ease;
      z-index: 0;

      &>*{
        z-index: 0;
      }

      &:hover{
        transform: translateX(5px);
        color: $orange;
      }
    }
  }
}
</style>