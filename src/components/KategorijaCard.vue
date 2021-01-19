<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.naziv }}</td>
      <td>{{ info.ulaznoGodiste }}</td>
      <td>{{ info.izlaznoGodiste }}</td>
      <td>{{ info.trener }}</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: ["info"],
  name: "KategorijaCard",
};
</script>
