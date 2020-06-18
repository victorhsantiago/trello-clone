<template>
  <div class="flex flex-col flex-grow items-start justify-between px-4">
    <div class="task-title">
      <fa class="opacity-50" :icon="['fas', 'quote-left']" />
      <input
        :value="task.name"
        type="text"
        class="p-2 mr-2 flex-grow text-xl-font-bold w-full"
        @change="updateTaskProperty('name', $event)"
      />
    </div>
    <div class="w-full">
      <span>
        <fa class="opacity-50 mr-2" :icon="['fas', 'align-left']" />
        Description
      </span>
      <textarea
        :value="task.description"
        class="description-box"
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
.task-title {
  @apply flex;
  @apply w-full;
  @apply items-center;
  @apply mb-4;
  border-bottom: 1px solid #ccc;
}

.description-box {
  @apply px-6;
  @apply py-2;
  @apply mt-2;
  @apply h-64;
  @apply border-none;
  @apply leading-normal;
  @apply w-full;
  @apply rounded;
  @apply bg-gray-300;
  resize: none;
}
</style>
