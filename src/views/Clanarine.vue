<template>
  <div class="clanarine">
    <div class="container.fluid">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-sm">
          <tablica-card />
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
              <input
                type="text"
                v-model="clan"
                class="form-control"
                id="clan"
                placeholder="Član"
              />
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
import TablicaCard from "@/components/TablicaCard.vue";
export default {
  name: "Clanarine",
  data() {
    return {
      trener: store.currentUser,
      mjesec: "",
      podmireno: "",
      clan: "",
      cijena: "",
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
  components: {
    TablicaCard,
  },
};
</script>
