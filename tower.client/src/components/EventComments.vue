<template>
  <div class="component card text-info p-2 mx-1 mt-3 bg-primary">
    <div class="text-light d-flex justify-content-between mb-2">
      <span>{{new Date(comment.createdAt).toLocaleDateString()}}</span>
    </div>
    <div class="d-flex flex-wrap justify-content-between">

      <div class="my-2 text-dark">
        <h5>
          {{comment.body}}
        </h5>
      </div>
      <div class="d-flex flex-wrap justify-content-end align-items-center">
        <span class="text-end text-light mx-2 text-center">
          <span class="d-flex"><i @click="deleteComment(comment.id)" v-if="comment.creatorId == account.id"
              class="mdi mdi-delete text-danger fs-5 me-2" title="delete!!" aria-label="delete Comment"></i>
            <p>-{{comment.creator.name}}</p>
          </span>
        </span>
        <img class="img" :src="comment.creator.picture" alt="pfp">
      </div>

    </div>
  </div>
  <!-- {{comment}} -->
</template>



<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Comment } from '../models/Comment.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteComment(id) {
        const yes = await Pop.confirm('Delete This?')
        if (!yes) {
          return
        }
        try {
          await commentsService.deleteComment(id)
        } catch (error) {
          Pop.error
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.img {
  height: 5vh;
  width: auto;
}
</style>