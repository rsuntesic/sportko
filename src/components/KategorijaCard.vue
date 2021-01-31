<template>
  <tbody>
    <tr>
      <th scope="row">
        <button
          v-on:click="azurirajKategorije"
          type="submit"
          class="btn btn-primary"
        >
          A
        </button>
      </th>
      <th scope="row">
        <button
          v-on:click="izmjeniKategorije"
          type="submit"
          class="btn btn-primary"
        >
          >
        </button>
      </th>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.naziv }}</td>
      <td>{{ info.ulaznoGodiste }}</td>
      <td>{{ info.izlaznoGodiste }}</td>
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
      ulaznoGodiste: null,
      izlaznoGodiste: null,
      trener: null,
    };
  },
  methods: {
    azurirajKategorije() {
      let n = confirm("Želite li uistinu ažurirati taj podatak");
      if (n == true) {
        db.collection("kategorije")
          .doc(this.info.id)
          .update({
            naziv: this.info.naziv,
            ulaznoGodiste: this.info.ulaznoGodiste,
            izlaznoGodiste: this.info.izlaznoGodiste,
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
    izmjeniKategorije() {
      let n = confirm("Želite li uistinu izmjeniti podatke u ovom redu?");

      if (n == true) {
        this.info.naziv = prompt("Unesite naziv kategorije", this.info.naziv);
        this.info.ulaznoGodiste = prompt(
          "Unesite ulazno Godiste kategorije",
          this.info.ulaznoGodiste
        );
        this.info.izlaznoGodiste = prompt(
          "Unesite izlazno Godiste kategorije",
          this.info.izlaznoGodiste
        );
        this.info.trener = prompt(
          "Unesite trenera kategorije",
          this.info.trener
        );
      } else {
        alert("Odustali ste od izmjene!!!");
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
