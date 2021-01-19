<template>
  <div class="clanovi">
    <!-- <h1>Treneri</h1>  -->
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
                <th scope="col">Licenca</th>
                <th scope="col">Telefon</th>
                <th scope="col">Adresa</th>
              </tr>
            </thead>
            <treneri-card
              v-for="treneri in treneri"
              :key="treneri.id"
              :info="treneri"
            />
          </table>
        </div>

        <div class="col-sm">
          <form @submit.prevent="dodajTrenera">
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
                v-model="emailTrenera"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="licenca">Licenca</label>
              <input
                type="text"
                v-model="licenca"
                class="form-control"
                id="licenca"
                placeholder="Licenca"
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
import TreneriCard from "@/components/TreneriCard.vue";

let brojac = 0;

export default {
  name: "Treneri",
  data() {
    return {
      treneri: [],
      korisnik: store.currentUser,
      ime: "",
      prezime: "",
      emailTrenera: "",
      licenca: "",
      telefon: "",
      adresa: "",
      brojac,
    };
  },

  methods: {
    dodajTrenera() {
      db.collection("treneri")
        .add({
          korisnik: this.korisnik,
          ime: this.ime,
          prezime: this.prezime,
          email: this.emailTrenera,
          licenca: this.licenca,
          telefon: this.telefon,
          adresa: this.adresa,
          dodano_u: Date.now(),
        })
        .then(() => {
          console.log("Spremljeno");
          this.ime = "";
          this.prezime = "";
          this.emailTrenera = "";
          this.licenca = "";
          this.telefon = "";
          this.adresa = "";
        })
        .catch(function(e) {
          console.error(e);
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
        .limit(10)
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
