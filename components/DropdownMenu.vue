<template>
  <div v-click-outside="closeMenu" class="relative">
    <fa
      class="opacity-50 cursor-pointer mr-2"
      :icon="['fas', 'bars']"
      @click="showMenu = !showMenu"
    />

    <ul v-if="showMenu" class="p-2 absolute right-0 bg-white rounded shadow">
      <li
        v-for="(item, i) in menuItems"
        :key="i"
        class="flex justify-between w-24 items-center cursor-pointer"
        @click="item.method(columnIndex)"
      >
        <fa class="opacity-50 mr-2" :icon="['fas', item.icon]" />
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      menuItems: [
        {
          icon: 'trash-alt',
          text: 'Excluir',
          method: this.deleteColumn,
        },
      ],
      showMenu: false,
    }
  },
  beforeDestroy() {
    this.closeMenu()
  },
  methods: {
    ...mapMutations('board', ['DELETE_COLUMN']),
    closeMenu() {
      this.showMenu = false
    },
    deleteColumn(columnIndex) {
      this.DELETE_COLUMN(columnIndex)
    },
  },
}
</script>
