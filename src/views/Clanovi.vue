<template>
  <div class="clanovi">
    <h1>Popis članova</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="dodajKorisnika">
            <div class="form-group">
              <label for="ime">Ime</label>
              <input
                type="text"
                v-model="ime"
                class="form-control"
                id="ime Korisnika"
                placeholder="Ime"
              />
            </div>
            <div class="form-group">
              <label for="prezime">Prezime</label>
              <input
                type="text"
                v-model="prezime"
                class="form-control"
                id="prezime"
                placeholder="Prezime"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email adresa</label>
              <input
                type="email"
                v-model="emailKorisnika"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="godiste">Godište</label>
              <input
                type="text"
                v-model="godiste"
                class="form-control"
                id="godiste"
                placeholder="Godište"
              />
            </div>
            <div class="form-group">
              <label for="telefon">Telefon</label>
              <input
                type="text"
                v-model="telefon"
                class="form-control"
                id="telefon"
                placeholder="Telefon"
              />
            </div>
            <div class="form-group">
              <label for="adresa">Adresa</label>
              <input
                type="text"
                v-model="adresa"
                class="form-control"
                id="adresa"
                placeholder="Adresa"
              />
            </div>
            <div class="form-group">
              <label for="kategorija">Kategorija</label>
              <input
                type="text"
                v-model="kategorija"
                class="form-control"
                id="kategorija"
                placeholder="Kategorija"
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
  name: "Clanovi",
  data() {
    return {
      trener: store.currentUser,
      ime: "",
      prezime: "",
      emailKorisnika: "",
      godiste: "",
      telefon: "",
      adresa: "",
      kategorija: "",
    };
  },
  methods: {
    dodajKorisnika() {
      db.collection("clanovi")
        .add({
          ime: this.ime,
          prezime: this.prezime,
          email: this.emailKorisnika,
          godiste: this.godiste,
          telefon: this.telefon,
          adresa: this.adresa,
          kategorija: this.kategorija,
          trener: this.trener,
          dodano_u: Date.now(),
        })
        .then(() => {
          console.log("Spremljeno");
          this.ime = "";
          this.prezime = "";
          this.emailKorisnika = "";
          this.godiste = "";
          this.telefon = "";
          this.adresa = "";
          this.kategorija = "";
        })
        .catch(function(e) {
          console.error(e);
        });
    },
  },
};
</script>
