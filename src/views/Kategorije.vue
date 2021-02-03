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
                placeholder="Naziv *"
              />
            </div>

            <div class="form-group">
              <label for="trener">Trener *</label>
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
            <div class="form-group">
              <label for="obavezno" style="font-size:10px"
                >Podatci označeni sa * se moraju obavezno unijeti!!</label
              >
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Potvrdi
              </button>
            </div>
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
      trener: "",
      trenerID: "",
      brojac,
    };
  },
  methods: {
    /*dohvatiID() {
      db.collection("treneri")
        .where(
          ("ime", "==", this.naziv.ime) && ("prezime", "==", this.naziv.prezime)
        )
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const data = doc.data();
            this.trenerID = doc.id;
            console.log("Trener " + trenerID);
          });
        });
    },*/
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
              trener: data.trener,
              brojac,
            });
          });
        });
    },
    dodajKategoriju() {
      if (this.naziv != "" && this.trener != "") {
        this.dohvatiID;
        db.collection("kategorije")
          .add({
            naziv: this.naziv,
            trener: this.trener,
            korisnik: this.korisnik,
            trenerID: this.trenerID,
            dodano_u: Date.now(),
          })
          .then(() => {
            alert("Podatak je unesen u bazu!!!");
            this.naziv = "";
            this.trener = "";
          })
          .catch(function(e) {
            alert("Greška kod unosa!" + e);
          });
      } else {
        alert("Neki od obaveznih podataka nije unesen!!");
      }
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
              naziv: data.ime + " " + data.prezime,
              email: data.email,
            });
          });
        });
    },
    getPosts() {
      db.collection("kategorije")
        .orderBy("naziv", "asc")
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
