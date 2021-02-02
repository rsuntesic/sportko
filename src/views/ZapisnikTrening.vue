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
      <h2>Treninzi</h2>
      <trening-card
        v-for="trening in treninzi"
        :key="trening.id"
        :info="trening"
      />
    </div>
    <div class="col-sm">
      <h2>Popis igraca na treningu:</h2>
      <form @submit.prevent="dodajTrening">
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
              id="igrac1"
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
              id="igrac2"
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
              id="igrac3"
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
import TreningCard from "@/components/TreningCard.vue";

export default {
  components: { PadajuciCard, TreningCard },
  name: "ZapisniTreninga",
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
    };
  },
  methods: {
    dodajTrening() {
      (this.igraci[0] = this.igrac1),
        (this.igraci[1] = this.igrac2),
        (this.igraci[2] = this.igrac3),
        (this.igraci[3] = this.igrac4),
        (this.igraci[4] = this.igrac5),
        (this.igraci[5] = this.igrac6),
        db
          .collection("treninzi")
          .add({
            datum: this.datum,
            vrijeme: this.vrijeme,
            igraci: this.igraci,
            trener: this.korisnik,
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
    this.getPosts1;
    this.getPosts;
  },
  computed: {
    getPosts1() {
      console.log("Firebase dohvat");

      db.collection("treninzi")
        .orderBy("dodano_u", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.treninzi = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.treninzi.push({
              id: doc.id,
              datum: data.datum,
              vrijeme: data.vrijeme,
              igraci: data.igraci,
              datumObjave: data.dodano_u,
            });
          });
        });
    },
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
