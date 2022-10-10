import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', "name picture")
    if (!comments) {
      throw new BadRequest('[getCommentsByEventId], This Id Is Not An Event Id That Is In The Database')
    }
    return comments
  }
  async postComment(data) {
    const comment = await dbContext.Comments.create(data)
    await comment.populate('creator', 'name picture')
    return comment
  }
  // TODO This is not done at all
  async deleteComment(id, userInfo) {
    const comment = await dbContext.Comments.findById(id).populate('creator', 'name picture')
    // @ts-ignore
    if (comment.creatorId != userInfo.id) {
      throw new Forbidden('This isnt your comment to delete')
    }
    await dbContext.Comments.findByIdAndRemove(id)
    return comment
  }
}
export const commentsService = new CommentsService