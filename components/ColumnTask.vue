<template>
  <div
    class="task"
    draggable
    @dragover.prevent
    @dragenter.prevent
    @dragstart="pickUpTask($event, taskIndex, columnIndex)"
    @click="goToTask(task.id)"
    @drop.stop="moveTask($event, column.tasks, columnIndex, taskIndex)"
  >
    <span class="w-full flex-no-shrink font-bold">
      {{ task.name }}
    </span>
    <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions('board', ['moveTaskOrColumn']),
    goToTask(id) {
      this.$router.push({ name: 'index-task-id', params: { id } })
    },
    pickUpTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
    moveTask(event, toTasks, toColumnIndex, toTaskIndex) {
      this.moveTaskOrColumn({ event, toTasks, toColumnIndex, toTaskIndex })
    },
  },
}
</script>

<style scoped>
.task {
  @apply flex;
  @apply items-center;
  @apply flex-wrap;
  @apply shadow;
  @apply mb-2;
  @apply py-2;
  @apply px-2;
  @apply rounded;
  @apply bg-white;
  @apply text-gray-700;
  @apply no-underline;
}
</style>
