<template>
  <div class="card text-center">
    <div class="card-header">Trening: {{ info.datum }}</div>
    <div class="card-body p-0">Vrijeme: {{ info.vrijeme }}</div>
    <div class="card-body p-0">Objavljeno: {{ postedFromNow }}</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Igrač</th>
          <th scope="col">Golovi</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["info"],
  name: "TreningCard",
  data: function() {
    return {
      igraci: [],
    };
  },

  computed: {
    postedFromNow() {
      return moment(this.info.datumObjave).fromNow();
    },
  },
  components: {},
};
</script>
