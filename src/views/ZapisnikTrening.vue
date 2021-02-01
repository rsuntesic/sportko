<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-sm">
      <label for="Datumtreninga">Datum treninga</label>
      <div class="form-group">
        <input
          type="date"
          v-model="datum"
          class="form-control"
          id="datum"
          placeholder="datum"
        />
      </div>
      <label for="Vrijemetreninga">Vrijeme treninga</label>
      <div class="form-group">
        <input
          type="time"
          v-model="vrijeme"
          class="form-control"
          id="vrijeme"
          placeholder="vrijeme"
        />
      </div>
    </div>
    <div class="col-sm">
      <h2>Popis igraca na treningu:</h2>
      <form @submit.prevent="dodajTrening">
        <div class="form-group">
          <label for="clanovi">Clanovi</label>
          <select
            v-for="brojIgraca in brojIgraca"
            :key="brojIgraca"
            class="form-control"
            id="igrac1"
            type="text"
            v-model="igrac"
          >
            <padajuci-card
              v-for="padajuci in padajuci"
              :key="padajuci.id"
              :info="padajuci"
            />
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Unesi podatke u bazu
        </button>
      </form>
    </div>
    <div class="col-sm">
      <form @submit.prevent="brIgraca">
        <div class="form-group">
          <label for="brojIgraca">Broj igraca na utakmici</label>
          <input
            type="number"
            v-model="brojac"
            class="form-control"
            id="brojIgraca"
            placeholder="Broj igraca"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Potvrdi
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
  name: "ZapisniTreninga",
  data() {
    return {
      korisnik: store.currentUser,
      padajuci: [],
      igraci: [],
      datum: "",
      vrijeme: "",
      brojac: "",
      brojIgraca: [],
    };
  },
  methods: {
    brIgraca() {
      let i = 0;
      for (i; i < this.brojac; i++) {
        this.brojIgraca.push({
          br: this.igrac,
        });
      }
    },
    dodajTrenera() {
      db.collection("treninzi")
        .add({
          datum: this.datum,
          vrijeme: this.vrijeme,
          igraci: this.igraci,
          trener: this.korisnik,
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
              naziv: data.email,
            });
          });
        });
    },
  },
};
</script>
