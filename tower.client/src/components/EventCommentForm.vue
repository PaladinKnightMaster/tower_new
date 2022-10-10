<template>
  <div class="component bg-secondary p-3 rounded-3 my-2">
    <div class="card bg-light p-2 my-1">
      <div class="form-group">
        <input type="text" v-model="newCom" placeholder="Comment Here" required class="form-control">
      </div>
    </div>
    <div class="mt-3">
      <button v-if="newCom" class="btn btn-outline-light mx-3" @click="commentFormSubmit()" aria-label="Post Comment"
        type="submit">Post</button>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()
    let newCom = ref('')
    return {
      newCom,
      async commentFormSubmit() {
        try {
          await commentsService.postComment(newCom.value, route.params.id)
          newCom.value = ''
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>