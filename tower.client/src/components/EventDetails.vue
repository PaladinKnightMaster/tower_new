<template>
  <div class="component text-light-shadow">
    <div class="card border border-dark border-3" :style="{backgroundImage: `url(${event.coverImg})`}">
      <div class="glass ">
        <div class="row flex-wrap ">
          <div class="col-sm-6 p-3 ps-4">
            <img :src="event.coverImg" alt="Ahhh" class="img-fluid rounded-2 ye">
          </div>
          <div class="col-sm-6 d-flex justify-content-between flex-column flex-wrap">
            <div>
              <div class="d-flex justify-content-between">
                <div>
                  <h3 class="text-light-shadow text-primary mt-3">{{event.name}}</h3>
                  <h6 class="text-light-shadow text-info mt-3">{{event.location}}</h6>
                  <div class="d-flex justify-content-between flex-wrap">
                    <p class="text-light-shadow text-info mt-3 ">Hosted By: <span
                        class="text-light">{{event?.creator?.name}}</span></p>
                    <p class="text-light-shadow text-info mt-3 ms-2">Event: <span
                        class="text-light">[{{event.type}}]</span></p>
                  </div>
                </div>
                <div>
                  <i v-if="account?.id == event?.creator?.id" title="Delete"
                    class="mdi fs-1 text-danger mdi-delete btn selectable p-0" aria-label="delete"
                    @click="deleteEvent(event.id)"></i>
                </div>
              </div>
            </div>
            <div class="pb-3">
              <p class="text-light-shadow text-warning mb-1 mt-3">{{new Date(event.startDate).toLocaleDateString()}}</p>
              <p class="text-light-shadow text-warning">Spots Available: <span
                  class="text-success">{{event.capacity}}</span></p>
            </div>
            <div class="pb-3 ">
              <div v-if="event.isCanceled" class="bg-danger rounded-2 text-shadow-light text-center ">This Event
                Has Been Canceled!
              </div>
              <span v-else-if="event.capacity == 0" class="p-2 rounded-2 text-shadow-light text-center bg-danger">No
                Spots Left!</span>
              <span v-else-if="isGot" class="text-danger">Ticket Purchased</span>
              <!-- <span v-else-if="user" class="text-danger">Login please</span> -->
              <button v-else class="btn btn-outline-success" aria-label="Attend" @click="createTicket()">Attend</button>
            </div>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-12 text-dark-shadow text-light">{{event.description}}</div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';
// import { AuthService } from '../services/AuthService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    // TODO Type check failing here
    event: { type: Object, required: true },

    // ticket: { required: true }
  },
  setup(props) {
    const route = useRoute()
    watchEffect(() => {
      // getEvents()
      // getEventById()
      getEventTickets()

    })
    async function getEventTickets() {
      try {
        await ticketsService.getSelectedEventTickets(route.params.id)
      } catch (error) {
        Pop.error(error, '[getEventTickets]')
      }
    }
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      isGot: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      async createTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          const ticket = { eventId: route.params.id, accountId: AppState.account.id }
          await ticketsService.createTicket(ticket)
          Pop.success('You have gotten a ticket for this event! Check Acc Page for more details')
        } catch (error) {
          Pop.error(error, '[createTicket]')
        }
      },

      async deleteEvent(id) {
        const yes = await Pop.confirm('Cancel This?')
        if (!yes) {
          return
        }
        try {
          await eventsService.deleteEvent(id)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
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