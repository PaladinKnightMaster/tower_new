import { Creator } from "./Creator"

export class Event {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg || 'https://i.etsystatic.com/9777752/r/il/6e7bd2/3092780015/il_1588xN.3092780015_78oh.jpg'
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = new Creator(data.creator)
  }
}

