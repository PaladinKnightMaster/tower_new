<template>
  <div class="component row">
    <div class="form-group  my-2 col-6">
      <input type="text" v-model="newEvent.name" placeholder="Event Name" min="1" required class="form-control">
    </div>
    <div class="form-group  my-2 col-6">
      <input type="text" v-model="newEvent.location" placeholder="Location" min="1" required class="form-control">
    </div>
    <div class="form-group  my-2 col">
      <input type="date" min="2022-10-08" max="" v-model="newEvent.startDate" placeholder="Start Date" required
        class="form-control">
    </div>
    <div class="form-group  my-2 col">
      <input type="number" v-model="newEvent.capacity" min="1" placeholder="Capacity" required class="form-control">
    </div>
    <div class="form-group my-2 col d-flex align-items-center">
      <select class="form-select form-select-sm bg-light p-1" required v-model="newEvent.type"
        aria-label=".form-select-sm">
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
    </div>
    <div class="form-group my-2">
      <input type="text" v-model="newEvent.description" min="1" placeholder="Description" required class="form-control">
    </div>
    <div class="form-group mb-4 mt-2">
      <input type="url" v-model="newEvent.coverImg" placeholder="Cover Image" class="form-control">
    </div>
    <div class="modal-footer"
      v-if="newEvent.name && newEvent.location && newEvent.startDate && newEvent.capacity && newEvent.type && newEvent.description">
      <button type="submit" @click="postEventSubmit()" class="btn btn-primary" aria-label="Post Event"
        data-bs-dismiss="modal">Post
        Event</button>
    </div>
    <div class="modal-footer text-warning" v-else> Complete Form To Post </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    let newEvent = ref({})
    return {
      newEvent,
      async postEventSubmit() {
        try {
          await eventsService.postEvent(newEvent.value)
          newEvent.value = {}
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