<template>
  <q-markup-table flat>
    <thead class="bg-primary text-white">
      <tr>
        <th class="text-left">Nutrition Facts</th>
        <th class="text-right">%RA for 100gr</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-left">Energy (kcal)</td>
        <td class="text-right">{{ nutrition.kcal.toFixed(2) }}</td>
      </tr>
      <tr>
        <td class="text-left">Fat (gr)</td>
        <td class="text-right">{{ nutrition.fat.toFixed(2) }}</td>
      </tr>
      <tr>
        <td class="text-left">Saturated Fat (gr)</td>
        <td class="text-right">
          {{ nutrition.saturatedFat.toFixed(2) }}
        </td>
      </tr>
      <tr>
        <td class="text-left">Carbohydrate (gr)</td>
        <td class="text-right">{{ nutrition.carbs.toFixed(2) }}</td>
      </tr>
      <tr>
        <td class="text-left">Sugars (gr)</td>
        <td class="text-right">{{ nutrition.sugar.toFixed(2) }}</td>
      </tr>
      <tr>
        <td class="text-left">Fiber (gr)</td>
        <td class="text-right">{{ nutrition.fiber.toFixed(2) }}</td>
      </tr>
      <tr>
        <td class="text-left">Protein (gr)</td>
        <td class="text-right">{{ nutrition.protein.toFixed(2) }}</td>
      </tr>
      <tr>
        <td class="text-left">Salt</td>
        <td class="text-right">{{ nutrition.salt.toFixed(2) }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>


<script>
export default {
    props:['nutrition']
}
</script>