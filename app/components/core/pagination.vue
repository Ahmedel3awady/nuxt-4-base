<template>
  <UFooter class="mt-3" v-if="state.meta.last_page > 1">
    <UPagination
      show-edges
      @update:page="updatePage"
      v-model:page="state.meta.current_page"
      :items-per-page="state.meta.per_page"
      :total="state.meta.total"
      :max="10"
    />
  </UFooter>
</template>

<script setup>
const { state, setQuery } = useQueryStore();

const updatePage = page => {
  setQuery({ page });
};
</script>
