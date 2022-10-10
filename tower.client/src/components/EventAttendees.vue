<template>
  <div class="component p-1">
    <div class="">
      <img class="h " :src="ticket.profile.picture" alt="Pfp" :title="ticket.profile.name">
      <!-- {{ticket}} -->
    </div>
  </div>
</template>


<script>
import { Ticket } from '../models/Ticket.js';

export default {
  props: {
    ticket: { type: Ticket, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.h {
  height: 5vh;
}

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