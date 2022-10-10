
export class Ticket {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    // this.createdAt = data.createdAt
    // this.event = new Event(data.event)
    this.profile = data.profile
  }
}