<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-sm navbar-light">
      <!-- Image and text -->

      <router-link to="/home">
        <img
          src="@/assets/logo.png"
          height="100"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="store.currentUser && !store.trenerUser"
              to="/PodaciKorisnik"
              >Podaci o korisniku
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="store.trenerUser"
              to="/ZapisnikUtakmica"
              >Utakmica
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="store.trenerUser"
              to="/ZapisnikTrening"
              >Trening
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="store.trenerUser"
              to="/Clanarine"
              >Članarine
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="store.trenerUser" to="/Clanovi"
              >Članovi
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="store.trenerUser" to="/Treneri"
              >Treneri
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="store.trenerUser"
              to="/Kategorije"
              >Kategorija
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-if="store.trenerUser"
              to="/KreirajNovost"
              >Kreiraj novost
            </router-link>
          </li>
        </ul>
        <form class="form-inline">
          <input
            v-model="store.searchTerm"
            class="form-control mr-sm-2"
            id="pretraga"
            type="search"
            placeholder="Pretraga"
            aria-label="Search"
          />
        </form>
        <router-link class="nav-link" v-if="!store.currentUser" to="/Login"
          >Login
        </router-link>
        <router-link class="nav-link" v-if="!store.currentUser" to="/signUp"
          >Sign up
        </router-link>
        <a
          href="#"
          v-if="store.currentUser"
          @click.prevent="logout"
          class="nav-link"
        >
          <img
            src="@/assets/logout.png"
            height="50"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
        </a>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store.js";
import { firebase } from "@/firebase";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    //user is signed in.
    console.log("**" + user.email);
    store.currentUser = user.email;
    db.collection("treneri")
      .where("email", "==", store.currentUser)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          const data = doc.data();
          store.trenerUser = store.currentUser;
          console.log("TR " + store.trenerUser);
        });
      });

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
  } else {
    //user is not signed in.
    console.log("***No user");
    store.currentUser = null;
    store.trenerUser = null;

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
      treneri: [],
      store: store,
      brojac: 0,
    };
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
          store.trenerUser = null;
          console.log("Log out trener " + store.trenerUser);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/style.scss";
</style>
