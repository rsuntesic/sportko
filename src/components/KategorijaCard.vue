<template>
  <tbody>
    <tr>
      <th scope="row">
        <button
          v-on:click="azurirajKategorije"
          type="submit"
          class="btn btn-primary"
        >
          >
        </button>
      </th>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.naziv }}</td>
      <td>{{ info.trener }}</td>
      <th scope="row">
        <button
          v-on:click="obrisiKategoriju"
          type="submit"
          class="btn btn-primary"
        >
          x
        </button>
      </th>
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
      naziv: null,
      trener: null,
    };
  },
  methods: {
    izmjeniKategorije() {
      this.info.naziv = prompt("Unesite naziv kategorije", this.info.naziv);
    },
    azurirajKategorije() {
      let n = confirm("Želite li uistinu ažurirati taj podatak");
      if (n == true) {
        this.izmjeniKategorije();
        db.collection("kategorije")
          .doc(this.info.id)
          .update({
            naziv: this.info.naziv,
            trener: this.info.trener,
          })
          .then(function() {
            alert("Podatak je uspješno ažuriran.");
          })
          .catch(function(error) {
            alert("Greška kod ažuriranja: ", error);
          });
      } else {
        alert("Niste ažurirali podatke!");
      }
    },

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
