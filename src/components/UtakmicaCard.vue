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
          <th scope="col">Golovi</th>
        </tr>
      </thead>
      <td>igrac</td>
      <td>0</td>
    </table>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["info"],
  name: "UtakmicaCard",
  computed: {
    postedFromNow() {
      return moment(this.info.datumObjave).fromNow();
    },
  },
};
</script>
