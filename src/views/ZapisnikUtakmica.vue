<template>
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm">
      <h2>Popis igraca na utakmici:</h2>
      <form @submit.prevent="dodajUtakmicu">
        <div class="form-group">
          <label for="igraci">Igraci</label>
          <select
            v-for="brojIgraca in brojIgraca"
            :key="brojIgraca"
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
  </div>
</template>
<script>
import { db } from "@/firebase";
import store from "@/store";
import PadajuciCard from "@/components/PadajuciCard.vue";
let brojac = 0;
export default {
  components: { PadajuciCard },
  name: "ZapisniUtakmica",
  data() {
    return {
      korisnik: store.currentUser,
      padajuci: [],
      brojac: "",
      brojIgraca: [],
    };
  },
  methods: {
    brIgraca() {
      let i = 0;
      for (i; i < this.brojac; i++) {
        this.brojIgraca.push({
          br: i,
        });
      }
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
