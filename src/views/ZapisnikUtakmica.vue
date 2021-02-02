<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-sm">
      <label for="Datumtreninga">Datum </label>
      <div class="form-group">
        <input
          type="date"
          v-model="datum"
          class="form-control"
          id="datum"
          placeholder="datum"
        />
      </div>
      <label for="Vrijemetreninga">Vrijeme </label>
      <div class="form-group">
        <input
          type="time"
          v-model="vrijeme"
          class="form-control"
          id="vrijeme"
          placeholder="vrijeme"
        />
      </div>
      <label for="momcadiRezultat">Momčadi i rezultat </label>
      <div class="form-group">
        <input
          type="text"
          v-model="momcadiRezultat"
          class="form-control"
          id="momcadiRezultat"
          placeholder="NK Dinamo 1:0 NK Hajduk"
        />
      </div>
    </div>
    <div class="col-sm">
      <h2>Popis igrača na utakmici:</h2>
      <form @submit.prevent="dodajUtakmicu">
        <div class="form-group">
          <div class="form-group">
            <select
              class="form-control"
              id="igrac1"
              type="text"
              v-model="igrac1"
            >
              <padajuci-card
                v-for="padajuci in padajuci"
                :key="padajuci.id"
                :info="padajuci"
              />
            </select>
          </div>
          <div class="form-group">
            <select
              class="form-control"
              id="igrac2"
              type="text"
              v-model="igrac2"
            >
              <padajuci-card
                v-for="padajuci in padajuci"
                :key="padajuci.id"
                :info="padajuci"
              />
            </select>
          </div>
          <div class="form-group">
            <select
              class="form-control"
              id="igrac3"
              type="text"
              v-model="igrac3"
            >
              <padajuci-card
                v-for="padajuci in padajuci"
                :key="padajuci.id"
                :info="padajuci"
              />
            </select>
          </div>
          <div class="form-group">
            <select
              class="form-control"
              id="igrac4"
              type="text"
              v-model="igrac4"
            >
              <padajuci-card
                v-for="padajuci in padajuci"
                :key="padajuci.id"
                :info="padajuci"
              />
            </select>
          </div>
          <div class="form-group">
            <select
              class="form-control"
              id="igrac5"
              type="text"
              v-model="igrac5"
            >
              <padajuci-card
                v-for="padajuci in padajuci"
                :key="padajuci.id"
                :info="padajuci"
              />
            </select>
          </div>
          <div class="form-group">
            <select
              class="form-control"
              id="igrac6"
              type="text"
              v-model="igrac6"
            >
              <padajuci-card
                v-for="padajuci in padajuci"
                :key="padajuci.id"
                :info="padajuci"
              />
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Unesi podatke u bazu
        </button>
      </form>
    </div>
    <div class="col-1"></div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import store from "@/store";
import PadajuciCard from "@/components/PadajuciCard.vue";
export default {
  components: { PadajuciCard },
  name: "ZapisniUtakmica",
  data() {
    return {
      korisnik: store.currentUser,
      padajuci: [],
      igraci: [],
      igrac1: "",
      igrac2: "",
      igrac3: "",
      igrac4: "",
      igrac5: "",
      igrac6: "",
      datum: "",
      vrijeme: "",
      momcadiRezultat: "",
    };
  },
  methods: {
    dodajUtakmicu() {
      (this.igraci[0] = this.igrac1),
        (this.igraci[1] = this.igrac2),
        (this.igraci[2] = this.igrac3),
        (this.igraci[3] = this.igrac4),
        (this.igraci[4] = this.igrac5),
        (this.igraci[5] = this.igrac6),
        db
          .collection("utakmice")
          .add({
            datum: this.datum,
            vrijeme: this.vrijeme,
            igraci: this.igraci,
            trener: this.korisnik,
            momcadiRezultat: this.momcadiRezultat,
            dodano_u: Date.now(),
          })
          .then(() => {
            alert("Podatak je unesen u bazu!!!");
          })
          .catch(function(e) {
            alert(e);
          });
    },
  },
  mounted() {
    //dohvat iz Firebasea
    this.getPosts;
  },
  computed: {
    getPosts() {
      console.log("Firebase dohvat");
      db.collection("clanovi")
        .get()
        .then((query) => {
          this.padajuci = [];
          query.forEach((doc) => {
            const data = doc.data();
            this.padajuci.push({
              id: doc.id,
              naziv: data.ime + " " + data.prezime,
            });
          });
        });
    },
  },
};
</script>
© 2021 GitHub, Inc.
