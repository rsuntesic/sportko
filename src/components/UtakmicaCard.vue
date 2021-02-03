<template>
  <div class="card text-center">
    <div class="card-header">{{ info.momcadiRezultat }}</div>
    <div class="card-body p-0">Datum: {{ info.datum }}</div>
    <div class="card-body p-0">Vrijeme: {{ info.vrijeme }}</div>
    <div class="card-body p-0">Objavljeno: {{ postedFromNow }}</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Igrač</th>
        </tr>
      </thead>
      <utakmica-igraci-card
        v-for="igrac in igraci"
        :key="igrac.igrac"
        :info="igrac"
      />
    </table>
  </div>
</template>
<script>
import moment from "moment";
import UtakmicaIgraciCard from "@/components/UtakmicaIgraciCard.vue";
export default {
  props: ["info"],
  name: "UtakmicaCard",
  data: function() {
    return {
      igraci: [],
    };
  },
  mounted() {
    this.dodajIgraca;
  },
  computed: {
    dodajIgraca() {
      let duzina = this.info.igraci.length;
      for (let i = 0; i < duzina; i++) {
        this.igraci.push({
          igrac: this.info.igraci[i],
        });
        console.log(this.info.igraci[i]);
      }
    },
    postedFromNow() {
      return moment(this.info.datumObjave).fromNow();
    },
  },
  components: {
    UtakmicaIgraciCard,
  },
};
</script>
