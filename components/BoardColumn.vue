<template>
  <div
    class="column"
    draggable
    @drop="moveColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickUpColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold justify-between">
      {{ column.name }}
      <dropdown-menu :column-index="columnIndex" />
    </div>
    <div class="task-list">
      <column-task
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :task-index="$taskIndex"
        :column-index="columnIndex"
        :column="column"
        :board="board"
      />
    </div>
    <input
      type="text"
      class="block p-2 w-full bg-transparent"
      placeholder="+ Enter new task"
      @keyup.enter="createTask(column.tasks, $event)"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    ColumnTask: () => import('./ColumnTask'),
    DropdownMenu: () => import('./DropdownMenu'),
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
    ...mapActions('board', ['moveTaskOrColumn']),
    ...mapMutations('board', ['CREATE_TASK']),
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
    moveColumn(event, toTasks, toColumnIndex, toTaskIndex) {
      this.moveTaskOrColumn({ event, toTasks, toColumnIndex, toTaskIndex })
    },
  },
}
</script>
