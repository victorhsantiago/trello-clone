<template>
  <app-drop :to-column="columnIndex" @drop="moveTaskOrColumn">
    <div class="column">
      <div class="flex items-center mb-2 font-bold justify-between">
        {{ column.name }}
        <div>
          <fa
            class="opacity-50 cursor-pointer ml-2"
            :icon="['fas', 'trash-alt']"
          />
          <app-drag
            :drag-data="{
              type: 'column',
              from: columnIndex,
            }"
          >
            <fa
              class="opacity-50 cursor-move ml-2"
              :icon="['fas', 'grip-vertical']"
            />
          </app-drag>
        </div>
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
  </app-drop>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    AppDrag: () => import('./AppDrag'),
    AppDrop: () => import('./AppDrop'),
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
    ...mapActions('board', ['moveTaskOrColumn']),
    ...mapMutations('board', ['CREATE_TASK']),
    createTask(tasks, event) {
      this.CREATE_TASK({
        tasks,
        name: event.target.value,
      })
      event.target.value = ''
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
