<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-7">
      <novosti-card
        v-for="novost in filterdNovosti"
        :key="novost.id"
        :info="novost"
      />
    </div>
    <div class="col-3">
      Sidebar
    </div>
  </div>
</template>

<script>
import NovostiCard from "@/components/NovostiCard.vue";
import store from "@/store";
import { db } from "@/firebase";

export default {
  name: "Home",
  data: function() {
    return {
      novosti: [],
      store,
    };
  },
  mounted() {
    //dohvat iz Firebasea
    this.getPosts;
  },
  computed: {
    getPosts() {
      console.log("Firebase dohvat");

      db.collection("novost")
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
      return this.novosti.filter((novost) => novost.naslov.includes(termin));

      /* for (let novost of this.novosti) {
        if (novost.naslov.indexOf(termin) >= 0) {
          noveNovosti.push(novost);
        }
      }*/
    },
  },
  components: {
    NovostiCard,
  },
};
</script>
