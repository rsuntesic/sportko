<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.ime }}</td>
      <td>{{ info.prezime }}</td>
      <td>{{ info.email }}</td>
      <td>{{ info.godiste }}</td>
      <td>{{ info.telefon }}</td>
      <td>{{ info.adresa }}</td>
      <td>{{ info.kategorija }}</td>
      <button v-on:click="obrisiClana" type="submit" class="btn btn-primary">
        x
      </button>
    </tr>
  </tbody>
</template>
<script>
import { db } from "@/firebase";
export default {
  props: ["info"],
  name: "ClanoviCard",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    obrisiClana() {
      let n = confirm("Želite li uistinu obrisati taj podatak");
      console.log("obrisi");
      if (n == true) {
        db.collection("clanovi")
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
