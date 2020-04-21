<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        :value="task.name"
        type="text"
        class="p-2 mr-2 flex-grow text-xl-font-bold w-full"
        @change="updateTaskProperty('name', $event)"
      />
      <textarea
        :value="task.description"
        class="relative bg-transparent px-2 mt-2 h-64 boder-none leading-normal w-full"
        @change="updateTaskProperty('description', $event)"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('board', ['getTask']),
    task() {
      return this.getTask(this.$route.params.id)
    },
  },
  methods: {
    ...mapMutations('board', ['UPDATE_TASK']),
    updateTaskProperty(key, event) {
      this.UPDATE_TASK({
        task: this.task,
        key,
        value: event.target.value,
      })
    },
  },
}
</script>

<style scoped>
.task-view {
  @apply relative;
  @apply flex;
  @apply flex-row;
  @apply bg-white;
  @apply mx-4;
  @apply m-32;
  @apply mx-auto;
  @apply py-4;
  @apply text-left;
  @apply rounded;
  @apply shadow;
  max-width: 700px;
}
</style>
