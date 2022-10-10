<template>
  <span class="navbar-text">
    <div class="text-center my-3" v-if="!user.isAuthenticated">
      <button aria-label="Login" class="btn selectable btn-success my-2 my-lg-0" @click="login">
        Login
      </button>
    </div>

    <div class=" my-2 d-flex justify-content-center flex-column" v-else>
      <!-- <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="authDropdown"> -->
      <div class="d-flex flex-wrap" v-if="account.picture || user.picture">
        <router-link :to="{ name: 'Account' }">
          <img :src="account.picture || user.picture" alt="account photo" height="" class="rounded img-fluid my-3"
            title="Your profile" aria-label="Go to Account" />
        </router-link>
      </div>
      <div class="d-flex justify-content-center">
        <button aria-label="Make New Event" class=" selectable text-light mb-3 text-dark-shadow btn btn-success"
          data-bs-toggle="modal" data-bs-target="#NewEventModal">
          New Event
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <router-link :to="{ name: 'Account' }">
          <button class="text-center mb-3 text-dark-shadow selectable btn text-warning" aria-label="Open Account">
            Account
          </button>
        </router-link>
      </div>
      <div class="d-flex justify-content-center">
        <button class="text-center text-dark-shadow selectable btn text-danger" @click="logout">
          logout
        </button>
      </div>
    </div>

    <div class="modal fade " id="NewEventModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="ModalLabel">Post An Event!</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <EventForm />
          </div>
        </div>
      </div>
    </div>
  </span>
  <span>

  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import AccountPage from '../pages/AccountPage.vue'
import EventForm from './EventForm.vue'

export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      }
    };
  },
  components: { AccountPage, EventForm }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

.text-dark-shadow {
  // color: #343474;
  // text-shadow: 0px 0px 3px rgb(249, 245, 245), 0px 0px 10px rgba(241, 238, 238, 0.752);
  text-shadow: 0px 0px 3px rgb(16, 16, 16), 0px 0px 10px rgba(120, 98, 98, 0.752);
  font-weight: bold;
  letter-spacing: 0.08rem;
}
</style>
