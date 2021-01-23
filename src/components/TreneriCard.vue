<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.ime }}</td>
      <td>{{ info.prezime }}</td>
      <td>{{ info.email }}</td>
      <td>{{ info.licenca }}</td>
      <td>{{ info.telefon }}</td>
      <td>{{ info.adresa }}</td>
      <td>
        <button
          v-on:click="obrisiTrenera"
          type="submit"
          class="btn btn-primary"
        >
          x
        </button>
      </td>
    </tr>
  </tbody>
</template>
<script>
import { db } from "@/firebase";
export default {
  props: ["info"],
  name: "TreneriCard",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    obrisiTrenera() {
      let n = confirm("Želite li uistinu obrisati taj podatak");
      console.log("obrisi");
      if (n == true) {
        db.collection("treneri")
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
