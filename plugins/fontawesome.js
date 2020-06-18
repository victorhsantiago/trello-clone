import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faTrashAlt,
  faQuoteLeft,
  faAlignLeft,
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faBars, faTrashAlt, faQuoteLeft, faAlignLeft)

Vue.component('fa', FontAwesomeIcon)
