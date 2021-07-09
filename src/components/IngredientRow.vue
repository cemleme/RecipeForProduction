<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ percentage }}% </q-item-label>
      <q-item-label>
        <q-linear-progress :value="percent" color="accent" />
      </q-item-label>
    </q-item-section>
    <q-item-section side top v-if="targetGrams">
      <q-item-label caption>{{grams}} gr</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["title", "percentage", "targetGrams"],
  setup(props) {
    const percent = computed(() => {
      return parseInt(props.percentage) / 100;
    });

    const grams = computed(() => {
        return (percent.value * props.targetGrams).toFixed();
    });

    return { percent, grams };
  },
};
</script>
