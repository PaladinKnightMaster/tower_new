<template>
  <div class="container-fluid">
    <div class="row">
      <div class="text-center text-light">
        <h3>My Events</h3>
      </div>
      <EventCard v-for="e in events" :event="e" />
    </div>
    <hr>
    <div class="row">
      <EventTickets v-for="t in tickets" :ticket="t" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import EventTickets from '../components/EventTickets.vue';
import { accountService } from '../services/AccountService.js';
export default {
  setup() {
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error, '[getEvents]')
      }
    }
    async function getMyTickets() {
      try {
        await accountService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEvents()
      getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events.filter(e => e.creator.id == AppState.account.id)),
      tickets: computed(() => AppState.tickets)
    };
  },
  components: { EventCard, EventTickets }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
