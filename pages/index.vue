<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        class="column"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            class="task"
            @click="goToTask(task.id)"
          >
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isTaskOpen" class="task-bg" @click.self="closeTask">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('board', ['board']),
    isTaskOpen() {
      return this.$route.name === 'index-task-id'
    },
  },
  methods: {
    goToTask(id) {
      this.$router.push({ name: 'index-task-id', params: { id } })
    },
    closeTask() {
      this.$router.push({ name: 'index' })
    },
  },
}
</script>

<style lang="css">
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

.column {
  @apply bg-gray-300;
  @apply p-2;
  @apply mr-4;
  @apply text-left;
  @apply shadow;
  @apply rounded;
  min-width: 350px;
}

.board {
  @apply p-4;
  @apply h-full;
  @apply overflow-auto;
}
.task-bg {
  @apply absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
</style>
