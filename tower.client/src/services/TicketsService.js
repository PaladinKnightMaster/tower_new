import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async createTicket(ticket) {
    const res = await api.post(`/api/tickets`, ticket)
    AppState.tickets = [...AppState.tickets, res.data]
    // console.log(AppState.tickets)
    // AppState.tickets = [...AppState.tickets, res.data]
    // AppState.selectedEvent = AppState.selectedEvent
  }

  async getSelectedEventTickets(id) {
    AppState.tickets = []
    const res = await api.get(`/api/events/${id}/tickets`)
    // const tickets = new Ticket(res.data)
    AppState.tickets = res.data
    // console.log(AppState.tickets)
  }
  async deleteTicket(id) {
    await api.delete(`/api/tickets/${id}`)
    AppState.tickets = AppState.tickets.filter(t => t.id != id)
  }
}
export const ticketsService = new TicketsService