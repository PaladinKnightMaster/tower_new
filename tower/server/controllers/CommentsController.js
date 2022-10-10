import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {

  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postComment)
      .delete('/:id', this.deleteComment)
  }
  async deleteComment(r, rs, nx) {
    try {
      const deletedComment = await commentsService.deleteComment(r.params.id, r.userInfo)
      rs.send(deletedComment)
    } catch (error) {
      nx(error)
    }
  }

  async postComment(rq, rs, nx) {
    try {
      rq.body.creatorId = rq.userInfo.id
      const comment = await commentsService.postComment(rq.body)
      rs.send(comment)
    } catch (error) {
      nx(error)
    }
  }
}