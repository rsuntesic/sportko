<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm">
      <h2>Popis igraca na treningu:</h2>
      <form @submit.prevent="dodajTrening">
        <unos-card v-for="unos in unos" :key="unos.id" :info="unos" />
        <button type="submit" class="btn btn-primary">
          Potvrdi
        </button>
      </form>
    </div>
    <div class="col-sm">
      Sidebar
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import store from "@/store";
import UnosCard from "@/components/UnosCard.vue";
export default {
  components: { UnosCard },
  name: "ZapisniTreninga",
  data() {
    return {
      korisnik: store.currentUser,
      unos: [],
    };
  },
  mounted() {
    //dohvat iz Firebasea
    this.getPosts;
  },
  computed: {
    getPosts() {
      console.log("Firebase dohvat");

      db.collection("clanovi")
        .get()
        .then((query) => {
          this.unos = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.unos.push({
              id: doc.id,
              ime: data.ime,
              prezime: data.prezime,
            });
          });
        });
    },
    components: {
      UnosCard,
    },
  },
};
</script>
