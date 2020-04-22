<template>
  <div class="h-full" @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    toColumn: {
      type: Number,
      required: true,
    },
    toTask: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onDrop(event) {
      const dragData = Object.assign(
        {},
        JSON.parse(event.dataTransfer.getData('drag-data')),
        { toColumn: this.toColumn, toTask: this.toTask }
      )

      this.$emit('drop', dragData)
    },
  },
}
</script>
