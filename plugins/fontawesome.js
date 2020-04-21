import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGripVertical, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faGripVertical, faTrashAlt)

Vue.component('fa', FontAwesomeIcon)
