import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/tickets', this.getTicketsByEventId)
      .get('/:id/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postEvent)
      .put('/:id', this.editEventById)
      .delete('/:id', this.cancelEvent)
  }

  async getAllEvents(req, res, next) {
    try {
      // REVIEW req.query is used in search functionality
      const events = await eventsService.getAllEvents(req.query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  // NOTE this doesnt work
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  // NOTE this doesnt work
  async getTicketsByEventId(req, res, next) {
    try {
      const eventTickets = await ticketsService.getTicketsByEventId(req.params.id)
      res.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }
  //NOTE This doesnt work
  async getCommentsByEventId(r, rs, n) {
    try {
      const comments = await commentsService.getCommentsByEventId(r.params.id)
      rs.send(comments)
    } catch (error) {
      n(error)
    }
  }
  async postEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newEvent = await eventsService.postEvent(req.body)
      res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEventById(req, res, next) {
    try {
      const editedEvent = await eventsService.editEventById(req.params.id, req.body, req.userInfo)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const canceledEvent = await eventsService.cancelEvent(req.params.id, req.userInfo)
      res.send(canceledEvent)
    } catch (error) {
      next(error)
    }
  }
}