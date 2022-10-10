import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
// import { Ticket } from "../models/Ticket.js"
import { router } from "../router.js"
import { api } from "./AxiosService.js"

class EventsService {
  // TODO event.type is used in process to make categorize buttons by type 
  async getEvents(type = '') {
    let res
    if (type) {
      res = await api.get('/api/events', {
        params: {
          type: type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    AppState.events = res.data.map(e => new Event(e))
    // console.log(AppState.events);
  }
  // async getMyEvents(id) {

  //   res = await api.get('/api/events', {
  //     params: {
  //       creator: id
  //     }
  //   })

  // }


  async getEventById(id) {
    const res = await api.get(`/api/events/${id}`)
    AppState.selectedEvent = new Event(res.data)
  }

  async postEvent(formData) {
    // const post = new Event(formData)
    const res = await api.post('/api/events', formData)
    const event = new Event(res.data)
    AppState.events = [...AppState.events, event]

    // NOTE does onMounted not get applied when already on this screen?
    router.push({ name: 'Event', params: { id: event.id } })
    this.getEventById(event.id)
  }

  async deleteEvent(id) {
    await api.delete(`/api/events/${id}`)
    // AppState.events = AppState.events.filter(e => e.id != id)
    console.log(AppState.selectedEvent)
    router.push({ name: 'Home' })
  }
}
export const eventsService = new EventsService