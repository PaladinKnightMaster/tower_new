import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Event.js').Event} */
  events: [],
  /** @type {import('./models/Event.js').Event} */
  selectedEvent: {},
  /** @type {import('./models/Ticket.js').Ticket} */
  tickets: [],
  // NOTE ^ this is really just a active tickets array
  /** @type {import('./models/Comment.js').Comment} */
  comments: []


})
