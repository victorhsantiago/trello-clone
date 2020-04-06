<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <board-column
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :column-index="$columnIndex"
        :board="board"
      />
      <div class="column flex">
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Create new column"
          @keyup.enter="createColumn($event)"
        />
      </div>
    </div>
    <div v-if="isTaskOpen" class="task-bg" @click.self="closeTask">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    BoardColumn: () => import('@/components/BoardColumn'),
  },
  computed: {
    ...mapState('board', ['board']),
    isTaskOpen() {
      return this.$route.name === 'index-task-id'
    },
  },
  mounted() {
    this.GET_USER_BOARD()
  },
  methods: {
    ...mapMutations('board', ['GET_USER_BOARD', 'CREATE_COLUMN']),
    closeTask() {
      this.$router.push({ name: 'index' })
    },
    createColumn(event) {
      this.CREATE_COLUMN({
        name: event.target.value,
      })
      event.target.value = ''
    },
  },
}
</script>

<style lang="css">
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
