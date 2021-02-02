<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-5">
      <h2>Novosti</h2>
      <novosti-card
        v-for="novost in filterdNovosti"
        :key="novost.id"
        :info="novost"
      />
    </div>
    <div class="col-5">
      <h2>Utakmice</h2>
      <utakmica-card
        v-for="utakmica in utakmice"
        :key="utakmica.id"
        :info="utakmica"
      />
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import NovostiCard from "@/components/NovostiCard.vue";
import UtakmicaCard from "@/components/UtakmicaCard.vue";
import store from "@/store";
import { db } from "@/firebase";

export default {
  name: "Home",
  data: function() {
    return {
      novosti: [],
      utakmice: [],
      store,
    };
  },
  mounted() {
    //dohvat iz Firebasea
    this.getPosts;
    this.getPosts1;
  },
  computed: {
    getPosts1() {
      console.log("Firebase dohvat");

      db.collection("utakmice")
        .orderBy("dodano_u", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.utakmice = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.utakmice.push({
              id: doc.id,
              momcadiRezultat: data.momcadiRezultat,
              datum: data.datum,
              vrijeme: data.vrijeme,
              igraci: data.igraci,
              datumObjave: data.dodano_u,
            });
          });
        });
    },
    getPosts() {
      console.log("Firebase dohvat");

      db.collection("novosti")
        .orderBy("dodano_u", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.novosti = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.novosti.push({
              id: doc.id,
              url: data.url,
              naslov: data.naslov,
              opis: data.tekstNovosti,
              vrijeme: data.dodano_u,
            });
          });
        });
    },
    filterdNovosti() {
      let termin = this.store.searchTerm;

      //PROBLEM VELIKA SLOVA------------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      //funkcijska metoda filter
      return this.novosti.filter(
        (novost) =>
          novost.naslov.includes(termin) || novost.opis.includes(termin)
      );
    },
  },
  components: {
    UtakmicaCard,
    NovostiCard,
  },
};
</script>
