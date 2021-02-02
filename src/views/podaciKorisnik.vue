<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-sm">
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
    <div class="col-sm">
      <trening-card
        v-for="trening in treninzi"
        :key="trening.id"
        :info="trening"
      />
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store";
import ClanarineClanCard from "@/components/ClanarineClanCard.vue";
import TreningCard from "@/components/TreningCard.vue";

let brojac = 0;

export default {
  name: "podaciKorisnik",
  data() {
    return {
      clanarine: [],
      treninzi: [],
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
    this.getPosts;
  },
  computed: {
    getPosts() {
      console.log("Firebase dohvat");

      db.collection("treninzi")
        .orderBy("dodano_u", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.treninzi = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.treninzi.push({
              id: doc.id,
              datum: data.datum,
              vrijeme: data.vrijeme,
              igraci: data.igraci,
              datumObjave: data.dodano_u,
            });
          });
        });
    },
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
    TreningCard,
  },
};
</script>
