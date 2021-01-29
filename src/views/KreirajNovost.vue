<template>
  <div class="kreirajNovost">
    <h1>Kreiraj novost</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="dodajNovost">
            <div class="form-group">
              <croppa
                :width="400"
                :height="400"
                placeholder="Ucitaj Sliku"
                v-model="url"
              ></croppa>
            </div>
            <div class="form-group">
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
              <textarea
                v-model="tekstNovosti"
                name="textarea"
                cols="40"
                rows="5"
              ></textarea>
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
import { db, storage } from "@/firebase";
import store from "@/store";

export default {
  name: "Novosti",
  data() {
    return {
      korisnik: store.currentUser,
      url: null,
      naslov: "",
      tekstNovosti: "",
    };
  },
  methods: {
    getImage() {
      //Promise based omotač oko callbacka

      return new Promise((resolveFn, errorFn) => {
        this.url.generateBlob((data) => {
          resolveFn(data);
        });
      });
    },
    dodajNovost() {
      this.getImage()
        .then((data) => {
          let imageName = store.currentUser + "/" + Date.now() + ".png";
          return storage.ref(imageName).put(data);
        })

        .then((result) => {
          //arrow funckija čuva this
          //uspješna linija
          return result.ref.getDownloadURL();
        })
        .then((url) => {
          //arrow funckija čuva this
          console.log("Javni link", url);
          return db.collection("novosti").add({
            url: url,
            naslov: this.naslov,
            tekstNovosti: this.tekstNovosti,
            korisnik: this.korisnik,
            dodano_u: Date.now(),
          });
        })
        .then((doc) => {
          alert("Novost je spremljena.");
          this.url.remove();
          this.naslov = "";
          this.tekstNovosti = "";
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>
