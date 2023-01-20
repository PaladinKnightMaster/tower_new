import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
// import { Ticket } from "../models/Ticket.js"
import { router } from "../router.js"
import { api } from "./AxiosService.js"

class EventsService {
  // NOTE Will make a get request on a type of event or of all the events in api if no type is selected
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
  }

  // NOTE unfinished but process to request events made by user started  
  // async getMyEvents(id) {
  //   res = await api.get('/api/events', {
  //     params: {
  //       creator: id
  //     }
  //   })
  // }

  // NOTE simple get request to server for a specific event based on Id
  async getEventById(id) {
    const res = await api.get(`/api/events/${id}`)
    AppState.selectedEvent = new Event(res.data)
  }

  // NOTE Will send data to server to create a new event and send the user to the newly made page with their event details
  async postEvent(formData) {
    const res = await api.post('/api/events', formData)
    const event = new Event(res.data)
    AppState.events = [...AppState.events, event]

    router.push({ name: 'Event', params: { id: event.id } })
    this.getEventById(event.id)
  }

  // NOTE Will send request to server to archive Event and push to home where event status is updated
  async deleteEvent(id) {
    await api.delete(`/api/events/${id}`)
    router.push({ name: 'Home' })
  }
}
export const eventsService = new EventsService