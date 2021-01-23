<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.naziv }}</td>
      <td>{{ info.ulaznoGodiste }}</td>
      <td>{{ info.izlaznoGodiste }}</td>
      <td>{{ info.trener }}</td>
      <button
        v-on:click="obrisiKategoriju"
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
  name: "KategorijaCard",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    obrisiKategoriju() {
      let n = confirm("Želite li uistinu obrisati taj podatak");
      console.log("obrisi");
      if (n == true) {
        db.collection("kategorije")
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
