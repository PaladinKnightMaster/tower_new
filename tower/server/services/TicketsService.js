import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
  async getTicketById(id) {
    const ticket = await dbContext.Tickets.findById(id).populate('profile').populate('event')
    return ticket
  }
  async deleteTicket(ticketId, userInfo) {
    const ticket = await this.getTicketById(ticketId)
    // @ts-ignore
    // TODO This doesnt work
    if (ticket.accountId != userInfo.id) {
      throw new Forbidden('This is not your ticket to delete')
    }
    // @ts-ignore
    await eventsService.upCapacity(ticket.eventId)
    await dbContext.Tickets.findByIdAndRemove(ticketId)
    return ticket
  }
  async getTicketsByAccId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event').populate('profile', 'name picture')
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return tickets
  }
  async postTicket(body) {
    const event = await dbContext.Events.findById(body.eventId)
    if (!event) {
      throw new Forbidden('This id does not apply to any in our database')
    }
    if (event.capacity = 0) {
      throw new Forbidden('There are no more tickets left')
    }
    else {
      await eventsService.lowerCapacity(body.eventId)
      const newTicket = await dbContext.Tickets.create(body)
      await newTicket.populate('profile', 'name picture')
      await newTicket.populate('event')
      return newTicket
    }
  }
}

export const ticketsService = new TicketsService