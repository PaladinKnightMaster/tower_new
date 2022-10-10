export class Comment {
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.body = data.body
    this.createdAt = data.createdAt
    this.creator = data.creator
  }

}