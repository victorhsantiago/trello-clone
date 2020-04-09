<template>
  <app-drop
    :to-column="columnIndex"
    :to-task="taskIndex"
    @drop="moveTaskOrColumn"
  >
    <app-drag
      class="task"
      :drag-data="{
        type: 'task',
        from: taskIndex,
        fromColumn: columnIndex,
      }"
      @click="goToTask(task.id)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </app-drag>
  </app-drop>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    AppDrag: () => import('./AppDrag'),
    AppDrop: () => import('./AppDrop'),
  },
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
