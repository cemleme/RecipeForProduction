<template>
  <q-card bordered class="">
    <q-card-section class="row">
      <div class="col">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el
            :label="parentPage.label"
            :to="parentPage.url"
            v-if="parentPage"
          />
          <slot name="extraBreadcrumbs"> </slot>
          <q-breadcrumbs-el :label="title" v-if="title" />
        </q-breadcrumbs>
        <slot name="header"> </slot>
      </div>
      <div class="justify-end">
        <slot name="actions"> </slot>
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <slot name="body"> </slot>
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
            <slot name="expand"> </slot>
          </q-card-section>
        </div>
      </q-slide-transition>
    </span>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  props: {
    title: { type: String, default: null },
    expand: { type: Boolean, default: false },
    expandLabel: { type: String, default: "" },
  },
  setup() {
    const route = useRoute();
    const expanded = ref(false);
    const parentPage = ref(null);

    let paths = route.path.split("/");
    if (paths.length > 2) {
      const bc = {};
      bc.label = paths[1].charAt(0).toUpperCase() + paths[1].slice(1);
      bc.url = "/" + paths[1];
      parentPage.value = bc;
    }

    return { expanded, parentPage };
  },
};
</script>
