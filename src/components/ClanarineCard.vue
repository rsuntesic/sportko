<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.mjesec }}</td>
      <td>{{ info.podmireno }}</td>
      <td>{{ info.cijena }} kn</td>
      <td>{{ info.clan }}</td>
      <button
        v-on:click="obrisiClanarine"
        type="submit"
        class="btn btn-primary"
      >
        x
      </button>
    </tr>
  </tbody>
</template>
<script>
import { db } from "@/firebase";
export default {
  props: ["info"],
  name: "ClanarineCard",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    obrisiClanarine() {
      let n = confirm("Želite li uistinu obrisati taj podatak");
      console.log("obrisi");
      if (n == true) {
        db.collection("clanarine")
          .doc(this.info.id)
          .delete()
          .then(function() {
            alert("Podatak je uspješno obrisan.");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      } else {
        alert("Podatak nije obrisan.");
      }
    },
  },
};
</script>
