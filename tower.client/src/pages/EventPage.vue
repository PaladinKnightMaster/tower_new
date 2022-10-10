<template>
  <div class="component container-fluid mt-3">
    <div class="row">
      <div class="col-md-12">
        <!-- Bad Idea -> v-for="t in tickets" :ticket="t" -->
        <EventDetails :event="event" />
      </div>
      <!-- TODO People Attending  -->
      <div class="col-md-12 my-2 text-light-shadow glass rounded-2 d-flex flex-wrap h">
        <EventAttendees v-for="t in tickets" :ticket="t" />
      </div>
    </div>
    <!-- TODO Comments here -->
    <div class="row justify-content-center">
      <div class="col-7 my-3" v-if="user.isAuthenticated">
        <EventCommentForm />
      </div>
      <div class="col-md-6 text-light-shadow glass p-4 rounded-2">
        <EventComments v-for="c in comments" :comment="c" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';
import EventDetails from '../components/EventDetails.vue';
import { ticketsService } from '../services/TicketsService.js';
import EventComments from '../components/EventComments.vue';
import EventAttendees from '../components/EventAttendees.vue';

export default {
  setup() {
    const route = useRoute()

    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error, '[getEvents]')
      }
    }
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id)
        // console.log(AppState.selectedEvent)
      } catch (error) {
        Pop.error(error, '[GetEvent]')
      }
    }
    async function getEventTickets() {
      try {
        await ticketsService.getSelectedEventTickets(route.params.id)
      } catch (error) {
        Pop.error(error, '[getEventTickets]')
      }
    }
    async function getEventComments() {
      try {
        await commentsService.getEventComments(route.params.id)
      } catch (error) {
        Pop.error(error, '[getEventComments]')
      }
    }
    // NOTE Watch Effect
    watchEffect(() => {
      getEvents()
      getEventById()
      getEventTickets()
      getEventComments()
    })
    onMounted(() => {
      getEvents()
      getEventById()
      getEventTickets()
      getEventComments()
    })
    return {
      user: computed(() => AppState.user),
      event: computed(() => AppState.selectedEvent),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      async deleteEvent(id) {
        try {
          const yes = await Pop.confirm('Delete This?')
          if (!yes) {
            return
          }
          await eventsService.deleteEvent(id)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { EventCard, EventDetails, EventComments, EventAttendees }
}
</script>

<style lang="scss" scoped>
.glass {
  background-color: rgba(12, 11, 11, 0.738);
  position: relative;
  bottom: 1;
  padding: .25rem;
}

.card {
  background-size: cover;
  background-position: center;
}

.text-light-shadow {
  // color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgb(234, 227, 227);
  font-weight: bold;
  letter-spacing: 0.08rem
}

.text-dark-shadow {
  // color: #343474;
  // text-shadow: 0px 0px 3px rgb(249, 245, 245), 0px 0px 10px rgba(241, 238, 238, 0.752);
  text-shadow: 0px 0px 3px rgb(16, 16, 16), 0px 0px 10px rgba(168, 58, 58, 0.752);
  font-weight: bold;
  letter-spacing: 0.08rem;
}
</style>