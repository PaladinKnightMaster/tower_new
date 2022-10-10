<template>
  <div class="component">
    <div class="glass p-3 my-3 rounded-2">
      <div class="row">
        <div class="col-12 text-primary d-flex flex-wrap justify-content-between">
          <h3>Event: {{ticket.event.name}}</h3>
          <i class="mdi mdi-delete text-danger selectable" @click="deleteTicket(ticket.id)">Don Wanna Go?</i>
        </div>
        <div class="text-light">
          {{ticket.event.description}}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';


export default {
  props: {
    ticket: { type: Object, required: true }
  },
  setup() {
    return {
      tickets: computed(() => AppState.tickets),
      async deleteTicket(id) {
        const yes = await Pop.confirm('Delete This?')
        if (!yes) {
          return
        }
        try {
          await ticketsService.deleteTicket(id)
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