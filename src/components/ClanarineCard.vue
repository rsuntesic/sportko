<template>
  <tbody>
    <tr>
      <th scope="row">
        <button
          v-on:click="azurirajClanarine"
          type="submit"
          class="btn btn-primary"
        >
          >
        </button>
      </th>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.mjesec }}</td>
      <td>{{ info.podmireno }}</td>
      <td>{{ info.cijena }} kn</td>
      <td>{{ info.clan }}</td>
      <th scope="row">
        <button
          v-on:click="obrisiClanarine"
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
  name: "ClanarineCard",
  data() {
    return {
      id: "",
      mjesec: null,
      podmireno: null,
      clan: null,
      cijena: null,
    };
  },
  methods: {
    izmjeniClanarine() {
      this.info.mjesec = prompt("Unesite mjesec članarine", this.info.mjesec);
      this.info.podmireno = prompt(
        "Unesite podmireno članarine",
        this.info.podmireno
      );
      this.info.cijena = prompt("Unesite cijena članarina", this.info.cijena);
      this.info.clan = prompt("Unesite člana", this.info.clan);
    },
    azurirajClanarine() {
      let n = confirm("Želite li uistinu ažurirati taj podatak");
      if (n == true) {
        this.izmjeniClanarine();
        db.collection("clanarine")
          .doc(this.info.id)
          .update({
            mjesec: this.info.mjesec,
            podmireno: this.info.podmireno,
            clan: this.info.clan,
            cijena: this.info.cijena,
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
