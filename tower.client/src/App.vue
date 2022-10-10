<template>
  <main class="container-fluid yo">
    <div class="row">
      <!-- <Navbar /> -->
    </div>
    <div class="row">
      <div class="col-md-11 scrollin">
        <router-link :to="{name: 'Home'}">
          <img alt="logo" src="src/assets/img/Logo.png" height="45" class="mt-4 mb-2" title="Home Page"
            aria-label="Home Page" />
        </router-link>
        <router-view />
      </div>
      <div class="col-md-1 d-md-block d-none bg-dark ye">
        <Login />
      </div>
    </div>

  </main>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
.ye {
  height: 100vh
}

.yo {
  height: 87vh;
}

.scrollin {
  max-height: 100vh;
  overflow: auto;
}


@import "./assets/scss/main.scss";
</style>
