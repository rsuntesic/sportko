<template>
  <div class="form-group">
    <label for="ime">{{ info.ime }}</label>
    <input
      type="text"
      v-model="ime"
      class="form-control"
      id="imeKorisnika"
      placeholder="ime"
    />
    <label for="prezime">{{ info.prezime }}</label>
    <input
      type="text"
      v-model="prezime"
      class="form-control"
      id="prezime"
      placeholder="prezime"
    />
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "UnosCard",
};
</script>
