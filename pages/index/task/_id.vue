<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      {{ task.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('board', ['getTask']),
    task() {
      return this.getTask(this.$route.params.id)
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
