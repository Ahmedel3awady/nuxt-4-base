import { UAvatar, UBadge } from '#components';
import UIDropdownMenu from '@/components/ui/dropdown-menu/index.vue';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';

import { refreshNuxtData } from "nuxt/app";
import type { IListingItem } from '~/types';
import type { ISource } from '~/types/source';

export const useSources = () => {
  const { $http } = useNuxtApp();
  const route = useRoute();
  const activeView = ref<'grid' | 'table'>((route.query.tab as 'grid' | 'table') || 'grid');
  const { t } = useI18n();
  const deleteModel = ref(false);
  const sourceId = ref<number>();
  const loading = ref(false);
  const confirmDelete = async () => {
    loading.value = true;
    await $http.sources.deleteSource(sourceId.value as number);
    deleteModel.value = false;
    loading.value = false;
    refreshNuxtData('sources');
  };
  const columns: TableColumn<ISource>[] = [
    {
      accessorKey: 'image',
      header: t('label.image'),
      cell: ({ row }) => {
        return h(UAvatar, { src: row.original.image, class: 'w-20 h-20 object-cover', size: 'xl' });
      },
    },
    {
      accessorKey: 'name',
      header: t('label.name'),
      cell: ({ row }) => {
        return h('span', row.original.name);
      },
    },
    {
      accessorKey: 'short_description',
      header: t('label.short_description'),
      cell: ({ row }) => {
        return h('span', row.original.short_description ?? 'لايوجد');
      },
    },

    {
      accessorKey: 'url',
      header: t('label.url'),
      cell: ({ row }) => {
        return h('a', { href: row.original.url, target: '_blank', class: 'text-primary' }, row.original.url);
      },
    },

    {
      accessorKey: 'is_block',
      header: t('label.status'),
      cell: ({ row }) => {
        return h(
          UBadge,
          { color: row.original.is_block ? 'error' : 'success' },
          { default: () => row.original.is_block ? t('inactive') : t('active') }
        )
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => {
        return h(UIDropdownMenu, { items: getDropdownItems(row.original) });
      },
    },
  ];


  const listItems = computed(() => (item: ISource): IListingItem[] => [
    { title: t('label.name'), value: item.name },
    { title: t('label.short_description'), value: item.short_description ?? 'لايوجد' },
    { title: t('label.url'), value: h('a', { href: item.url, target: '_blank', class: 'text-primary' }, item.url), class: 'col-span-full' },
  ]);
  const getDropdownItems = (item: ISource): DropdownMenuItem[] => {
    return [

      [{
        label: t('button.edit'),
        color: 'primary',
        icon: 'i-lucide-pencil',
        to: { name: 'edit-source', params: { id: item.id } },
      },
      {
        label: item.is_block ? t('button.unblock') : t('button.block'),
        color: 'warning',
        icon: item.is_block ? 'i-lucide-eye' : 'i-lucide-eye-off',
        onSelect: async () => {
          sourceId.value = item.id;
          if (item.is_block) {
            await $http.sources.unblockSource(item.id);
          } else {
            await $http.sources.blockSource(item.id);
          }
          refreshNuxtData('sources');
        },
      }],
      [
        {
          label: t('button.delete'),
          color: 'error',
          icon: 'i-lucide-trash',
          onSelect: () => {
            sourceId.value = item.id;
            deleteModel.value = true;
          },
        },
      ],
    ];
  };
  return {
    columns,
    activeView,
    listItems,
    getDropdownItems,
    deleteModel,
    confirmDelete,
    loading
  };
};