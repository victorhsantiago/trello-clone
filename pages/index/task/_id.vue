<template>
  <div class="task-view">
    <task-detail />
  </div>
</template>

<script>
export default {
  components: {
    TaskDetail: () => import('@/components/TaskDetail'),
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
