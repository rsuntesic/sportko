<template>
  <tbody>
    <tr>
      <th scope="row">
        <button
          v-on:click="azurirajTrenera"
          type="submit"
          class="btn btn-primary"
        >
          >
        </button>
      </th>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.ime }}</td>
      <td>{{ info.prezime }}</td>
      <td>{{ info.email }}</td>
      <td>{{ info.licenca }}</td>
      <td>{{ info.telefon }}</td>
      <td>{{ info.adresa }}</td>
      <th scope="row">
        <button
          v-on:click="obrisiTrenera"
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
  name: "TreneriCard",
  data() {
    return {
      id: "",
      ime: "",
      prezime: "",
      email: "",
      licenca: "",
      telefon: "",
      adresa: "",
    };
  },
  methods: {
    izmjeniTrenera() {
      this.info.ime = prompt("Unesite ime ", this.info.ime);
      this.info.prezime = prompt("Unesite prezime ", this.info.prezime);
      this.info.email = prompt("Unesite email ", this.info.email);
      this.info.licenca = prompt("Unesite licencu ", this.info.licenca);
      this.info.telefon = prompt("Unesite telefon ", this.info.telefon);
      this.info.adresa = prompt("Unesite adresu ", this.info.adresa);
    },
    azurirajTrenera() {
      let n = confirm("Želite li uistinu ažurirati taj podatak");
      if (n == true) {
        this.izmjeniTrenera();
        db.collection("treneri")
          .doc(this.info.id)
          .update({
            ime: this.info.ime,
            prezime: this.info.prezime,
            email: this.info.email,
            telefon: this.info.telefon,
            adresa: this.info.adresa,
            licenca: this.info.licenca,
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
