<template>
  <div
    class="column"
    draggable
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickUpColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <column-task
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :task-index="$taskIndex"
        :column-index="columnIndex"
        :column="column"
        :board="board"
      />
      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        @keyup.enter="createTask(column.tasks, $event)"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  components: {
    ColumnTask: () => import('./ColumnTask'),
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations('board', ['CREATE_COLUMN', 'MOVE_TASK', 'MOVE_COLUMN']),
    createTask(tasks, event) {
      this.CREATE_TASK({
        tasks,
        name: event.target.value,
      })
      event.target.value = ''
    },

    pickUpColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn(event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(
          event,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        )
      } else {
        this.moveColumn(event, toColumnIndex)
      }
    },
    moveTask(event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')

      this.MOVE_TASK({ fromTasks, toTasks, fromTaskIndex, toTaskIndex })
    },
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')

      this.MOVE_COLUMN({ fromColumnIndex, toColumnIndex })
    },
  },
}
</script>

<style scoped>
.column {
  @apply bg-gray-300;
  @apply p-2;
  @apply mr-4;
  @apply text-left;
  @apply shadow;
  @apply rounded;
  min-width: 350px;
}
</style>
