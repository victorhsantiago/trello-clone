<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    dragData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrag(event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('drag-data', JSON.stringify(this.dragData))
    },
  },
}
</script>
