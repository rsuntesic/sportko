<template>
  <tbody>
    <tr>
      <th scope="row">{{ info.brojac }}</th>
      <td>{{ info.mjesec }}</td>
      <td>{{ info.podmireno }}</td>
      <td>{{ info.cijena }} kn</td>
      <td>{{ info.clan }}</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: ["info"],
  name: "ClanarineCard",
};
</script>
