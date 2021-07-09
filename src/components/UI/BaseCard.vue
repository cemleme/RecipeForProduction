<template>
  <q-card bordered class="">
    <q-card-section class="row">
      <div class="col">
        <slot name="header">
        </slot>
      </div>
      <div class="justify-end">
        <slot name="actions">
        </slot>
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <slot name="body">
      </slot>
    </q-card-section>

    <span v-if="expand">
      <q-card-actions>
        <q-btn
          flat
          color="dark"
          :label="(expanded ? 'Hide ' : 'Show ') + expandLabel"
          @click="expanded = !expanded"
        />
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-if="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            <slot name="expand">
            </slot>
          </q-card-section>
        </div>
      </q-slide-transition>
    </span>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
      expand: {type:Boolean, default: false},
      expandLabel: {type:String, default: ''}
  },
  setup() {
    const expanded = ref(false);

    return { expanded };
  },
};
</script>
