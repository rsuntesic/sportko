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
        <div class="row">
          <div class="col-sm">
            <div class="form-group">
              <label for="igrac">Igrac</label>

              <select
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
          </div>
          <div
            class="col-2"
            style="margin-top: 15px; 
              margin-left: -15px;"
          >
            <button
              type="button"
              @click.prevent="dodajIgraca()"
              class="btn btn-primary"
              style="width:35px; height: 35px;"
            >
              +
            </button>
          </div>
        </div>
        <div class="form-group">
          <table class="table">
            <tbody v-for="(ing, i) in igraci" :key="i">
              <tr>
                <th scope="row" style="font-weight: normal;">
                  {{ i + 1 }}
                </th>
                <td style="font-weigt: bold; ">
                  {{ ing.igrac }}
                </td>

                <td>
                  <button
                    type="button"
                    @click.prevent="obrisiIgraca(i)"
                    class="btn btn-primary"
                    style="height:30px; width: 30px; margin-top: -5px; font-size: 10px;"
                  >
                    x
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
      igrac: "",
      datum: "",
      vrijeme: "",
      momcadiRezultat: "",
    };
  },
  methods: {
    obrisiIgraca(broj) {
      console.log(broj);
      this.igraci.splice(broj, 1);
    },
    dodajIgraca() {
      if (this.igrac) {
        this.igraci.push({
          igrac: this.igrac,
        });
        (this.igrac = ""), console.log(this.igrac);
      } else {
        alert("Neki podatak je krivo unesen!!");
      }
    },
    dodajUtakmicu() {
      db.collection("utakmice")
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
