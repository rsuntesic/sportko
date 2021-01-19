<template>
  <div class="clanovi">
    <div class="container.fluid">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-sm">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ime</th>
                <th scope="col">Prezime</th>
                <th scope="col">Email</th>
                <th scope="col">Godište</th>
                <th scope="col">Telefon</th>
                <th scope="col">Adresa</th>
                <th scope="col">Kategorija</th>
              </tr>
            </thead>
            <clanovi-card
              v-for="clanovi in clanovi"
              :key="clanovi.id"
              :info="clanovi"
            />
          </table>
        </div>
        <div class="col-sm">
          <form @submit.prevent="dodajClana">
            <div class="form-group">
              <label for="ime">Ime</label>
              <input
                type="text"
                v-model="ime"
                class="form-control"
                id="imeKorisnika"
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
                type="number"
                v-model="godiste"
                class="form-control"
                id="godiste"
                placeholder="Godište"
              />
            </div>
            <div class="form-group">
              <label for="telefon">Telefon</label>
              <input
                type="number"
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
              <select
                class="form-control"
                id="kategorija"
                type="text"
                v-model="kategorija"
              >
                <padajuci-card
                  v-for="padajuci in padajuci"
                  :key="padajuci.id"
                  :info="padajuci"
                />
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              Potvrdi
            </button>
          </form>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import store from "@/store";
import ClanoviCard from "@/components/ClanoviCard.vue";
import PadajuciCard from "@/components/PadajuciCard.vue";

let brojac = 0;

export default {
  name: "Clanovi",
  data() {
    return {
      padajuci: [],
      clanovi: [],
      trener: store.currentUser,
      ime: "",
      prezime: "",
      emailKorisnika: "",
      godiste: "",
      telefon: "",
      adresa: "",
      kategorija: "",
      brojac,
    };
  },
  methods: {
    dodajClana() {
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
  mounted() {
    //dohvat iz Firebasea
    this.getKategorije;
    this.getPosts;
  },
  computed: {
    getKategorije() {
      db.collection("kategorije")
        .limit(25)
        .get()
        .then((query) => {
          this.padajuci = [];

          query.forEach((doc) => {
            const data = doc.data();

            this.padajuci.push({
              id: doc.id,
              naziv: data.naziv,
            });
          });
        });
    },
    getPosts() {
      db.collection("clanovi")
        .orderBy("ime", "asc")
        .limit(10)
        .get()
        .then((query) => {
          this.clanovi = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.clanovi.push({
              id: doc.id,
              ime: data.ime,
              prezime: data.prezime,
              godiste: data.godiste,
              telefon: data.telefon,
              email: data.email,
              adresa: data.adresa,
              kategorija: data.kategorija,
              brojac: brojac,
            });
          });
        });
    },
  },
  components: {
    ClanoviCard,
    PadajuciCard,
  },
};
</script>
