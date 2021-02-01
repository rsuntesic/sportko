<template>
  <div class="kategorije">
    <div class="container.fluid">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-sm">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Ažuriraj</th>
                <th scope="col">#</th>
                <th scope="col">Naziv</th>
                <th scope="col">Ulazno godište</th>
                <th scope="col">Izlazno godište</th>
                <th scope="col">Trener</th>
                <th scope="col">Obriši</th>
              </tr>
            </thead>
            <kategorija-card
              v-for="kategorije in kategorije"
              :key="kategorije.id"
              :info="kategorije"
            />
          </table>
          <button v-on:click="getPosts1" type="submit" class="btn btn-primary">
            Osvježi
          </button>
        </div>
        <div class="col-sm">
          <h3>Unos kategorije</h3>
          <form @submit.prevent="dodajKategoriju">
            <div class="form-group">
              <input
                type="text"
                v-model="naziv"
                class="form-control"
                id="nazivKategorije"
                placeholder="Naziv"
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                v-model="ulaznoGodiste"
                class="form-control"
                id="ulaznoGodiste"
                placeholder="Ulazno godište"
              />
            </div>
            <div class="form-group">
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
              <select
                class="form-control"
                id="trener"
                type="text"
                v-model="trener"
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
import KategorijaCard from "@/components/KategorijaCard.vue";
import PadajuciCard from "@/components/PadajuciCard.vue";

let brojac = 0;

export default {
  name: "Kategorije",
  data() {
    return {
      padajuci: [],
      kategorije: [],
      korisnik: store.currentUser,
      naziv: "",
      ulaznoGodiste: "",
      izlaznoGodiste: "",
      trener: "",
      brojac,
    };
  },
  methods: {
    getPosts1() {
      db.collection("kategorije")
        .orderBy("naziv", "asc")
        .limit(50)
        .get()
        .then((query) => {
          this.kategorije = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.kategorije.push({
              id: doc.id,
              naziv: data.naziv,
              ulaznoGodiste: data.ulaznoGodiste,
              izlaznoGodiste: data.izlaznoGodiste,
              trener: data.trener,
              brojac,
            });
          });
        });
    },
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
        })
        .catch(function(e) {
          console.error(e);
        });
    },
  },
  mounted() {
    //dohvat iz Firebasea
    this.getTreneri;
    this.getPosts;
  },
  computed: {
    getTreneri() {
      db.collection("treneri")
        .limit(25)
        .get()
        .then((query) => {
          this.padajuci = [];

          query.forEach((doc) => {
            const data = doc.data();

            this.padajuci.push({
              id: doc.id,
              naziv: data.email,
            });
          });
        });
    },
    getPosts() {
      db.collection("kategorije")
        .orderBy("ulaznoGodiste", "asc")
        .limit(10)
        .get()
        .then((query) => {
          this.kategorije = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.kategorije.push({
              id: doc.id,
              naziv: data.naziv,
              ulaznoGodiste: data.ulaznoGodiste,
              izlaznoGodiste: data.izlaznoGodiste,
              trener: data.trener,
              brojac: brojac,
            });
          });
        });
    },
  },

  components: {
    KategorijaCard,
    PadajuciCard,
  },
};
</script>
