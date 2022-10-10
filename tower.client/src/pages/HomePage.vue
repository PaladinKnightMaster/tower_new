<template>
  <div class="d-flex justify-content-around my-3">
    <button aria-label="filter By None" @click="getEventsT('')" class="btn btn-outline-warning">All</button>
    <button aria-label="filter By concert" @click="getEventsT('concert')"
      class="btn btn-outline-warning">Concert</button>
    <button aria-label="filter By convention" @click="getEventsT('convention')"
      class="btn btn-outline-warning">Convention</button>
    <button aria-label="filter By sport" @click="getEventsT('sport')" class="btn btn-outline-warning">Sport</button>
    <button aria-label="filter By digital" @click="getEventsT('digital')"
      class="btn btn-outline-warning">Digital</button>
  </div>
  <div class="row p-3">
    <EventCard v-for="e in events" :key="e.id" :event="e" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error, '[getEvents]')
      }
    }
    onMounted(() => {
      getEvents()
    })
    return {
      events: computed(() => AppState.events),
      async getEventsT(type) {
        try {
          await eventsService.getEvents(type)
        } catch (error) {
          Pop.error(error, '[getEvents]')
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">

</style>
