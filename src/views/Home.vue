<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-7">
      <novosti-card
        v-for="novost in filterdNovosti"
        :key="novost.url"
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
let novosti = [];

novosti = [
  {
    url: "https://picsum.photos/id/1/400",
    naslov: "Naslov 1",
    opis: "Tekst novosti 1",
  },
  {
    url: "https://picsum.photos/id/2/400",
    naslov: "Naslov 2",
    opis: "Tekst novosti 2",
  },
  {
    url: "https://picsum.photos/id/3/400",
    naslov: "Naslov 3",
    opis: "Tekst novosti 3",
  },
];

export default {
  name: "Home",
  data: function() {
    return {
      novosti,
      store,
    };
  },
  computed: {
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
