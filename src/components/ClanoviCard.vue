<template>
  <tbody>
    <tr>
      <th scope="row">
        <button
          v-on:click="azurirajClana"
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
      <td>{{ info.godiste }}</td>
      <td>{{ info.telefon }}</td>
      <td>{{ info.adresa }}</td>
      <td>{{ info.kategorija }}</td>
      <th scope="row">
        <button v-on:click="obrisiClana" type="submit" class="btn btn-primary">
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
  name: "ClanoviCard",
  data() {
    return {
      id: "",
      ime: "",
      prezime: "",
      email: "",
      godiste: "",
      telefon: "",
      adresa: "",
      kategorija: "",
    };
  },
  methods: {
    izmjeniClana() {
      this.info.ime = prompt("Unesite ime člana", this.info.ime);
      this.info.prezime = prompt("Unesite prezime člana", this.info.prezime);
      this.info.email = prompt("Unesite email člana", this.info.email);
      this.info.godiste = prompt("Unesite godiste člana", this.info.godiste);
      this.info.telefon = prompt("Unesite telefon člana", this.info.telefon);
      this.info.adresa = prompt("Unesite adresu člana", this.info.adresa);
      this.info.kategorija = prompt(
        "Unesite kategoriju člana",
        this.info.kategorija
      );
    },
    azurirajClana() {
      let n = confirm("Želite li uistinu ažurirati taj podatak");
      if (n == true) {
        this.izmjeniClana();
        db.collection("clanovi")
          .doc(this.info.id)
          .update({
            ime: this.info.ime,
            prezime: this.info.prezime,
            email: this.info.email,
            godiste: this.info.godiste,
            telefon: this.info.telefon,
            adresa: this.info.adresa,
            kategorija: this.info.kategorija,
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
