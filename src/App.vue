<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="!store.currentUser" to="/Login">Login</router-link>
      <router-link v-if="!store.currentUser" to="/signUp">Sign up</router-link>
      <a
        href="#"
        v-if="store.currentUser"
        @click.prevent="logout"
        class="nav-link"
        >Logout</a
      >
    </div>
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
