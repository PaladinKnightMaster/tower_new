import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async getAllEvents(query) {
    const events = await dbContext.Events.find({
      // isCanceled: false,
      ...query,
    }).populate('creator', 'name picture')
    return events
  }
  async getEventById(id) {
    const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('[getEventById] This id does not apply to any Events in database')
    }
    return event
  }
  async postEvent(body) {
    const newEvent = await dbContext.Events.create(body)
    await newEvent.populate('creator', 'name picture')
    return newEvent
  }
  async editEventById(id, body, userInfo) {
    const selectedEvent = await this.getEventById(id)
    if (selectedEvent.isCanceled) {
      throw new Forbidden('[editEventById] This is canceled you cannot edit this')
    }
    if (selectedEvent.creatorId != userInfo.id) {
      throw new Forbidden('[editEventById] This is not yours to edit')
    }

    // TODO is there an easier way to do this process?
    // REVIEW Not really but yes
    selectedEvent.name = body.name || selectedEvent.name
    selectedEvent.description = body.description || selectedEvent.description
    selectedEvent.coverImg = body.coverImg || selectedEvent.coverImg
    selectedEvent.location = body.location || selectedEvent.location
    selectedEvent.capacity = body.capacity || selectedEvent.capacity
    selectedEvent.startDate = body.startDate || selectedEvent.startDate
    // TODO What the bruh... What is the purpose? v
    // REVIEW Random rule
    // selectedEvent.isCanceled = body.isCanceled || selectedEvent.isCanceled
    selectedEvent.type = body.type || selectedEvent.type

    await selectedEvent.save()
    return selectedEvent
  }
  async cancelEvent(id, userInfo) {
    const canceledEvent = await dbContext.Events.findById(id)
    if (!canceledEvent) {
      throw new BadRequest('Invalid Event Id')
    }

    // @ts-ignore
    if (userInfo.id != canceledEvent.creatorId.toString()) {
      throw new Forbidden('You must own this to cancel')
    }
    // TODO ask why this is screamin at me even though it works
    // Possibly null
    canceledEvent.isCanceled = true

    await canceledEvent.save()
    return canceledEvent
  }
  async lowerCapacity(eventId) {
    const event = await this.getEventById(eventId)
    if (!event) {
      throw new Forbidden('The Id you supplied is not an event Id')
    }
    // @ts-ignore
    if (event.capacity > 0) {
      // @ts-ignore
      event.capacity = event.capacity - 1
      await event.save()
    }
    else {
      throw new BadRequest('No slots left! You cant buy another!')
    }
  }
  // async checkCapacity(eventId) {
  //   const event = await this.getEventById(eventId)
  //   // if (event.capacity = 0) {
  //   //   throw new
  //   // }
  // }
  async upCapacity(id) {
    const event = await this.getEventById(id)
    if (!event) {
      throw new Forbidden('The Id you supplied is not an event Id')
    }
    // @ts-ignore
    event.capacity = event.capacity + 1
    await event.save()
  }

}
export const eventsService = new EventsService