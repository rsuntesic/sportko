<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light">
      <!-- Image and text -->
      <a class="navbar-brand" href="#">
        <img
          src="@/assets/logo.png"
          height="40"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
      </a>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              v-if="store.currentUser"
              src="@/assets/logo.png"
            >
            </router-link>
          </li>
          <router-link v-if="!store.currentUser" to="/Login">
            Login
          </router-link>
          <li class="nav-item">
            <router-link v-if="!store.currentUser" to="/signUp">
              Sign up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              href="#"
              v-if="store.currentUser"
              @click.prevent="logout"
              class="nav-link"
            >
              Logout
            </router-link>
          </li>
        </ul>
      </div>
      <form class="form-inline my-2 my-lg-0">
        <input
          v-model="store.searchTerm"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Pretraga"
          aria-label="Search"
        />
      </form>
    </nav>
    <router-view />
  </div>
</template>

<script>
import store from "@/store.js";
import { firebase } from "@/firebase";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    //user is signed in.
    console.log("***" + user.email);
    store.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
  } else {
    //user is not signed in.
    console.log("***No user");
    store.currentUser = null;

    if (currentRoute.meta.needsUser) {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "app",
  data() {
    //funkcija
    return {
      //objekt
      store: store,
    };
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
