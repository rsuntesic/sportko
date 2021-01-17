<template>
  <div class="kreirajNovost">
    <h1>Kreiraj novost</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="dodajNovost">
            <div class="form-group">
              <label for="url">Url slike</label>
              <input
                type="url"
                v-model="url"
                class="form-control"
                id="urlSlike"
                placeholder="Link na sliku"
              />
            </div>
            <div class="form-group">
              <label for="naslov">Naslov</label>
              <input
                type="text"
                v-model="naslov"
                class="form-control"
                id="naslov"
                placeholder="Naslov"
              />
            </div>
            <div class="form-group">
              <label for="tekstNovosti">Tekst novosti</label>
              <input
                type="text"
                v-model="tekstNovosti"
                class="form-control"
                id="tekstNovosti"
                placeholder="Tekst novosti..."
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
  name: "Novosti",
  data() {
    return {
      korisnik: store.currentUser,
      url: "",
      naslov: "",
      tekstNovosti: "",
    };
  },
  methods: {
    dodajNovost() {
      db.collection("novost")
        .add({
          url: this.url,
          naslov: this.naslov,
          tekstNovosti: this.tekstNovosti,
          korisnik: this.korisnik,
          dodano_u: Date.now(),
        })
        .then(() => {
          console.log("Spremljeno");
          this.url = "";
          this.naslov = "";
          this.tekstNovosti = "";
        })
        .catch(function(e) {
          console.error(e);
        });
    },
  },
};
</script>
