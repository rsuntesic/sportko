<template>
  <div class="card text-center">
    <div class="card-header">{{ info.naslov }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.url" />
    </div>
    <div class="card-footer text-muted">
      {{ info.opis }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "NovostiCard",
};
</script>
