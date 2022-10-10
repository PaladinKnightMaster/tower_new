<template>
  <!-- {{event}} -->
  <div class="component col-lg-3 col-md-4 col-sm-6 text-light-shadow my-3">
    <div class="card border border-dark border-3" :style="{backgroundImage: `url(${event.coverImg})`}">
      <div class="glas">
      </div>
      <router-link :to="{name:'Event', params:{id: event.id}}">
        <div class="glass selectable">
          <h6 class="text-center pt-1 m-0">
            {{event.name}}
          </h6>
          <hr class="my-2">

          <div class="text-dark-shadow text-warning">
            <p>{{event.location}}</p>
            <p>{{new Date(event.startDate).toLocaleDateString()}}</p>
          </div>
          <p class="text-danger bold" v-if="event.isCanceled">Canceled!</p>
          <p class="text-danger text-center border" v-else-if="event.capacity == 0">No Spots Left!</p>
          <p class="text-info" v-else>{{event.capacity}} Spots Left!</p>
        </div>
      </router-link>

    </div>

  </div>
</template>


<script>
import { Event } from '../models/Event.js';

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.card {
  background-size: cover;
  background-position: center;
}

.glass {
  // height: 17vh;
  background-color: rgba(40, 34, 34, 0.571);
  position: relative;
  bottom: 1;
  padding: .25rem;
  // text-overflow: ellipsis;
  // overflow: hidden;
}

.glas {
  height: 20vh;
}

.text-light-shadow {
  color: aliceblue;
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