import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {

  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postTicket)
      .delete('/:id', this.deleteTicket)
  }
  async deleteTicket(rq, rs, nxt) {
    try {
      const deletedTicket = await ticketsService.deleteTicket(rq.params.id, rq.userInfo)
      rs.send(deletedTicket)
    } catch (error) {
      nxt(error)
    }
  }
  async postTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      // await eventsService.checkCapacity(req.body.eventId)
      const newTicket = await ticketsService.postTicket(req.body)
      res.send(newTicket)
    } catch (error) {
      next(error)
    }
    // try {
    //   await eventsService.lowerCapacity(req.body.eventId)
    // } catch (error) {
    //   next(error)
    // }
  }
}