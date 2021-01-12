<template>
  <div class="kategorije">
    <h1>Unos kategorija</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="dodajKategoriju">
            <div class="form-group">
              <label for="naziv">Naziv</label>
              <input
                type="text"
                v-model="naziv"
                class="form-control"
                id="nazivKategorije"
                placeholder="Naziv"
              />
            </div>
            <div class="form-group">
              <label for="ulaznoGodiste">Ulazno godište</label>
              <input
                type="number"
                v-model="ulaznoGodiste"
                class="form-control"
                id="ulaznoGodiste"
                placeholder="Ulazno godište"
              />
            </div>
            <div class="form-group">
              <label for="izlaznoGodiste">Izlazno godište</label>
              <input
                type="number"
                v-model="izlaznoGodiste"
                class="form-control"
                id="izlaznoGodiste"
                placeholder="Izlazno godište"
              />
            </div>
            <div class="form-group">
              <label for="trener">Trener</label>
              <input
                type="text"
                v-model="trener"
                class="form-control"
                id="trener"
                placeholder="Trener"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Potvrdi
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import store from "@/store";
export default {
  name: "Kategorije",
  data() {
    return {
      korisnik: store.currentUser,
      naziv: "",
      ulaznoGodiste: "",
      izlaznoGodiste: "",
      trener: "",
    };
  },
  methods: {
    dodajKategoriju() {
      db.collection("kategorije")
        .add({
          naziv: this.naziv,
          ulaznoGodiste: this.ulaznoGodiste,
          izlaznoGodiste: this.izlaznoGodiste,
          trener: this.trener,
          korisnik: this.korisnik,
          dodano_u: Date.now(),
        })
        .then(() => {
          console.log("Spremljeno");
          this.naziv = "";
          this.ulaznoGodiste = "";
          this.izlaznoGodiste = "";
          this.trener = "";
          s;
        })
        .catch(function(e) {
          console.error(e);
        });
    },
  },
};
</script>
