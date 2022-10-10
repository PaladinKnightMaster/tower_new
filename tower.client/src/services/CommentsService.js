import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getEventComments(id) {
    AppState.comments = []
    const res = await api.get(`/api/events/${id}/comments`)
    AppState.comments = res.data
  }
  async postComment(data, evenId) {
    const eventId = evenId
    const body = data
    const full = { body, eventId }
    const res = await api.post('api/comments', full)
    AppState.comments = [res.data, ...AppState.comments]
  }
  async deleteComment(id) {
    await api.delete(`/api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id != id)
  }
}
export const commentsService = new CommentsService