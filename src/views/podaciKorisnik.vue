<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-5">
      <h2>Clanairne korisnika</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Naziv</th>
            <th scope="col">Podmireno</th>
            <th scope="col">Cijena</th>
            <th scope="col">Član</th>
          </tr>
        </thead>
        <clanarine-clan-card
          v-for="clanarine in clanarine"
          :key="clanarine.id"
          :info="clanarine"
        />
      </table>
    </div>
    <div class="col-5"></div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store";
import ClanarineClanCard from "@/components/ClanarineClanCard.vue";

let brojac = 0;

export default {
  name: "podaciKorisnik",
  data() {
    return {
      clanarine: [],
      trener: store.currentUser,
      mjesec: "",
      podmireno: "",
      clan: "",
      cijena: "",
      brojac,
    };
  },
  methods: {},
  mounted() {
    //dohvat iz Firebasea
    this.getPosts1;
  },
  computed: {
    getPosts1() {
      db.collection("clanarine")
        .where("clan", "==", store.currentUser)
        .get()
        .then((query) => {
          this.clanarine = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.clanarine.push({
              id: doc.id,
              mjesec: data.mjesec,
              podmireno: data.podmireno,
              clan: data.clan,
              cijena: data.cijena,
              brojac: brojac,
            });
          });
        });
    },
  },
  components: {
    ClanarineClanCard,
  },
};
</script>
