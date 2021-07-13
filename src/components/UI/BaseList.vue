<template>
  <div>
    <teleport to="body">
      <q-dialog v-model="showConfirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="negative" text-color="white" />
            <span class="q-ml-sm"
              >Do you really want to delete {{ selectedTitle }}?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              v-close-popup
              @click="cancelDelete"
            />
            <q-btn
              flat
              label="Delete"
              color="primary"
              v-close-popup
              @click="deleteItem"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </teleport>

    <q-toolbar class="bg-primary text-white rounded-borders" v-if="useFilter">
      <q-space />
      <q-input
        dark
        dense
        standout
        v-model="filter"
        input-class="text-right"
        class="q-ml-md"
      >
        <template v-slot:append>
          <q-icon v-if="filter === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="filter = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <q-list bordered separator>
      <q-item
        v-for="item in filteredItems"
        :key="item.id"
        clickable
        v-ripple
        @click="selectItem(item)"
      >
        <q-item-section>
          <q-item-label v-if="item.name">{{ item.name }}</q-item-label>
          <slot name="label" :item="item"></slot>
          <q-item-label caption v-if="item.description">{{
            item.description
          }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="q-gutter-sm">
            <slot name="additionalActionButtons" :item="item"></slot>
            <q-btn
              round
              size="10px"
              color="warning"
              icon="edit"
              @click.capture.stop="editItem(item.id)"
            />
            <q-btn
              round
              size="10px"
              color="negative"
              icon="delete"
              @click.capture.stop="askDelete(item.id)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    useFilter: { type: Boolean, default: true },
    filterProp: { type: String, default: "name" },
    items: { type: Array, required: true },
    cancelOnClickItem: { type: Boolean, default: false },
    subCollectionPath: { type: String, default: "" },
  },
  setup(props, { emit, attrs }) {
    const route = useRoute();
    const router = useRouter();
    const filter = ref("");
    const selectedId = ref();
    const showConfirm = ref(false);

    const filteredItems = computed(() => {
      if (!props.useFilter) return props.items;
      return props.items.filter((i) => {
        return i[props.filterProp]
          .toLowerCase()
          .includes(filter.value.toLowerCase());
      });
    });

    const selectItem = function(item) {
      if(attrs.onSelectItem) emit("selectItem", item);
      else router.push(route.path + "/" + props.subCollectionPath + item.id);
    };

    const editItem = function(id) {
      if(attrs.onEditItem) emit("editItem", id);
      else router.push(route.path + "/" + props.subCollectionPath + id + "/edit");
    };

    const askDelete = function(id) {
      showConfirm.value = true;
      selectedId.value = id;
    };

    const selectedTitle = computed(() => {
      return props.items.find((i) => i.id == selectedId.value).name;
    });

    const cancelDelete = function() {
      selectedId.value = null;
      showConfirm.value = false;
    };

    const deleteItem = function() {
      showConfirm.value = false;
      if (!selectedId.value) return;
      emit("deleteItem", selectedId.value);
    };

    return {
      filter,
      filteredItems,
      selectedTitle,
      showConfirm,
      selectItem,
      editItem,
      askDelete,
      cancelDelete,
      deleteItem,
    };
  },
};
</script>
