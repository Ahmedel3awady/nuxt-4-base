<template>
  <UTabs
    :items="items"
    :content="false"
    :ui="{
      root: 'w-[120px]',
      list: 'h-[50px] p-2  bg-white rounded-lg',
      trigger: 'cursor-pointer',
    }"
    v-model="active"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const route = useRoute();
const router = useRouter();

const items = ref<TabsItem[]>([
  { icon: 'i-lucide-layout-grid', value: 'grid' },
  { icon: 'i-lucide-list', value: 'table' },
]);

const active = computed({
  get: () => props.modelValue ?? (route.query.tab as string) ?? 'table',
  set: tab => {
    router.push({ name: route.name, query: { ...route.query, tab } });
    emit('update:modelValue', tab);
  },
});
</script>
