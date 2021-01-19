<template>
  <div class="clanarine">
    <div class="container.fluid">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-sm">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Naziv</th>
                <th scope="col">Podmireno</th>
                <th scope="col">Cijena</th>
                <th scope="col">Član</th>
              </tr>
            </thead>
            <clanarine-card
              v-for="clanarine in clanarine"
              :key="clanarine.id"
              :info="clanarine"
            />
          </table>
        </div>
        <div class="col-sm">
          <form @submit.prevent="dodajClanarinu">
            <div class="form-group">
              <label for="mjesecLista">Mjesec</label>
              <select
                class="form-control"
                id="mjesecLista"
                type="text"
                v-model="mjesec"
              >
                <option>Siječanj (1.)</option>
                <option>Veljača (2.)</option>
                <option>Ožujak (3.)</option>
                <option>Travanj (4.)</option>
                <option>Svibanj (5.)</option>
                <option>Lipanj (6.)</option>
                <option>Srpanj (7.)</option>
                <option>Kolovoz (8.)</option>
                <option>Rujan (9.)</option>
                <option>Listopad (10.)</option>
                <option>Studeni (11.)</option>
                <option>Prosinac (12.)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="podmireno">Podmireno</label>
              <select
                class="form-control"
                id="podmireno"
                type="text"
                v-model="podmireno"
              >
                <option>Da</option>
                <option>Ne</option>
              </select>
            </div>
            <div class="form-group">
              <label for="clan">Član</label>
              <select class="form-control" id="clan" type="text" v-model="clan">
                <padajuci-card
                  v-for="padajuci in padajuci"
                  :key="padajuci.id"
                  :info="padajuci"
                />
              </select>
            </div>
            <div class="form-group">
              <label for="cijena">Cijena</label>
              <input
                type="number"
                v-model="cijena"
                class="form-control"
                id="cijena"
                placeholder="Cijena"
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
import ClanarineCard from "@/components/ClanarineCard.vue";
import PadajuciCard from "@/components/PadajuciCard.vue";

let brojac = 0;

export default {
  name: "Clanarine",
  data() {
    return {
      padajuci: [],
      clanarine: [],
      trener: store.currentUser,
      mjesec: "",
      podmireno: "",
      clan: "",
      cijena: "",
      brojac,
    };
  },
  methods: {
    dodajClanarinu() {
      db.collection("clanarina")
        .add({
          mjesec: this.mjesec,
          podmireno: this.podmireno,
          clan: this.clan,
          cijena: this.cijena,
          trener: this.trener,
          dodano_u: Date.now(),
        })
        .then(() => {
          console.log("Spremljeno");
          this.mjesec = "";
          this.podmireno = "";
          this.clan = "";
          this.cijena = "";
        })
        .catch(function(e) {
          console.error(e);
        });
    },
  },
  mounted() {
    //dohvat iz Firebasea
    this.getClanove;
    this.getPosts;
  },
  computed: {
    getClanove() {
      db.collection("clanovi")
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
      db.collection("clanarina")
        .orderBy("mjesec", "asc")
        .limit(10)
        .get()
        .then((query) => {
          this.clanarine = [];
          brojac = 0;
          query.forEach((doc) => {
            const data = doc.data();
            brojac++;

            this.clanarine.push({
              id: doc.id,
              mjesec: data.mjesec,
              podmireno: data.podmireno,
              cijena: data.cijena,
              clan: data.clan,
              brojac: brojac,
            });
          });
        });
    },
  },
  components: {
    ClanarineCard,
    PadajuciCard,
  },
};
</script>
