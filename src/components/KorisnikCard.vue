<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.datum }}</td>
      <td>{{ info.vrijeme }}</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: ["info"],
  name: "KorisnikCard",
};
</script>

