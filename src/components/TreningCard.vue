<template>
  <div class="card text-center">
    <div class="card-header">Trening: {{ info.datum }}</div>
    <div class="card-body p-0">Vrijeme: {{ info.vrijeme }}</div>
    <div class="card-body p-0">Objavljeno: {{ postedFromNow }}</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Igrači</th>
        </tr>
      </thead>
      <trening-igraci-card
        v-for="igrac in igraci"
        :key="igrac.igrac"
        :info="igrac"
      />
    </table>
  </div>
</template>
<script>
import moment from "moment";
import TreningIgraciCard from "@/components/TreningIgraciCard.vue";
export default {
  props: ["info"],
  name: "TreningCard",
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
      for (let i = 0; i < 23; i++) {
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
    TreningIgraciCard,
  },
};
</script>
