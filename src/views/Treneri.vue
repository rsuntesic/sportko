<template>
  <div class="treneri">
    <div class="container.fluid">
      <div class="row">
        <div class="col-1"></div>
        <div id="osvjezi" class="col-sm">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Ažuriraj</th>
                <th scope="col">#</th>
                <th scope="col">Ime</th>
                <th scope="col">Prezime</th>
                <th scope="col">Email</th>
                <th scope="col">Licenca</th>
                <th scope="col">Telefon</th>
                <th scope="col">Adresa</th>
                <th scope="col">Obriši</th>
              </tr>
            </thead>
            <treneri-card
              v-for="treneri in treneri"
              :key="treneri.id"
              :info="treneri"
            />
          </table>
          <button v-on:click="getPosts1" type="submit" class="btn btn-primary">
            Osvježi
          </button>
        </div>
        <div class="col-sm">
          <h3>Unos trenera</h3>
          <form @submit.prevent="dodajTrenera">
            <div class="form-group">
              <input
                type="text"
                v-model="ime"
                class="form-control"
                id="imeKorisnika"
                placeholder="Ime"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                v-model="prezime"
                class="form-control"
                id="prezime"
                placeholder="Prezime"
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="licenca">Licenca</label>
              <select
                class="form-control"
                id="mjesecLista"
                type="text"
                v-model="licenca"
              >
                <option>Kontinentalna Pro</option>
                <option>Kontinentalna A</option>
                <option>Kontinentalna B</option>
                <option>Kontinentalna C</option>
                <option>Nacionalna A</option>
                <option>Nacionalna B</option>
                <option>Nacionalna C</option>
              </select>
            </div>
            <div class="form-group">
              <input
                type="number"
                v-model="telefon"
                class="form-control"
                id="telefon"
                placeholder="Telefon"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                v-model="adresa"
                class="form-control"
                id="telefon"
                placeholder="Adresa"
              />
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
import router from "@/router";
import TreneriCard from "@/components/TreneriCard.vue";

let brojac = 0;

export default {
  name: "Treneri",
  data() {
    return {
      treneri: [],
      korisnik: store.currentUser,
      ime: null,
      prezime: null,
      email: null,
      licenca: null,
      telefon: null,
      adresa: null,
      brojac,
    };
  },

  methods: {
    dodajTrenera() {
      if (this.telefon.length == 9 || this.telefon.length == 10) {
        db.collection("treneri")
          .add({
            korisnik: this.korisnik,
            ime: this.ime,
            prezime: this.prezime,
            email: this.email,
            licenca: this.licenca,
            telefon: this.telefon,
            adresa: this.adresa,
            dodano_u: Date.now(),
          })
          .then(() => {
            alert("Podatak je unesen u bazu!!!");
            this.ime = null;
            this.prezime = null;
            this.email = null;
            this.licenca = null;
            this.telefon = null;
            this.adresa = null;
          })
          .catch(function(e) {
            console.error(e);
          });
      } else {
        alert("Telefon mora imati minimalno 9, a maksimalno 10 znamenki.");
      }
    },
    getPosts1() {
      db.collection("treneri")
        .orderBy("ime", "asc")
        .limit(50)
        .get()
        .then((query) => {
          this.treneri = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.treneri.push({
              id: doc.id,
              ime: data.ime,
              prezime: data.prezime,
              licenca: data.licenca,
              telefon: data.telefon,
              email: data.email,
              adresa: data.adresa,
              brojac: brojac,
            });
          });
        });
    },
  },

  mounted() {
    //dohvat iz Firebasea
    this.getPosts;
  },
  computed: {
    getPosts() {
      db.collection("treneri")
        .orderBy("ime", "asc")
        .limit(50)
        .get()
        .then((query) => {
          this.treneri = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.treneri.push({
              id: doc.id,
              ime: data.ime,
              prezime: data.prezime,
              licenca: data.licenca,
              telefon: data.telefon,
              email: data.email,
              adresa: data.adresa,
              brojac: brojac,
            });
          });
        });
    },
  },
  components: {
    TreneriCard,
  },
};
</script>
