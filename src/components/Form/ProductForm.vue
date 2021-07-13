<template>
  <div>
    <div class="row justify-end">
      <q-btn
        color="positive"
        icon="check"
        label="Save"
        size="sm"
        :disabled="!canSave"
        @click="saveProduct"
      />
      </div>
        <q-input
          clearable
          filled
          color="purple-12"
          v-model="product.name"
          label="Product Name"
        />
        <q-input
          clearable
          filled
          color="purple-12"
          v-model="product.description"
          label="Product Description"
        />

  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: ["modelValue"],
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();

    const product = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const saveProduct = async function() {
      store
        .dispatch("product/saveProduct", { product: product.value })
        .then(() => {
          router.push("/products");
        });
    };

    const canSave = computed(() => {
      return true;
    });

    return {
      product,
      canSave,
      saveProduct,
    };
  },
};
</script>
