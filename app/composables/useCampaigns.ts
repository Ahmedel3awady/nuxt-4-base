import UIDropdownMenu from '@/components/ui/dropdown-menu/index.vue';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';

import { refreshNuxtData } from "nuxt/app";
import type { ICampaign } from '~/types/campaign';
export const useCampaigns = () => {
  const { $http } = useNuxtApp();
  const route = useRoute();
  const activeView = ref<'grid' | 'table'>((route.query.tab as 'grid' | 'table') || 'grid');
  const { t } = useI18n();
  const deleteModel = ref(false);
  const campaignId = ref<number>();
  const loading = ref(false);
  const sendOffer = ref(false);
  const loadingOffer = ref(false);
  const sendOfferConfirm = async () => {
    loadingOffer.value = true;
    try {
      await $http.campaigns.sendOfferCampaign(campaignId.value as number);
      sendOffer.value = false;
      loadingOffer.value = false;
    } finally {
      loadingOffer.value = false;
    }
  };
  const confirmDelete = async () => {
    loading.value = true;
    await $http.campaigns.deleteCampaign(campaignId.value as number);
    deleteModel.value = false;
    loading.value = false;
    refreshNuxtData('campaigns');
  };
  const columns: TableColumn<ICampaign>[] = [
    {
      accessorKey: 'user.name',
      header: t('label.name'),
      cell: ({ row }) => {
        return h('span', row.original.name);
      },
    },
    {
      accessorKey: 'description',
      header: t('label.description'),
      cell: ({ row }) => {
        return h('span', row.original.description ?? 'لايوجد');
      },
    },
    {
      accessorKey: 'starting_time',
      header: t('label.starting_time'),
      cell: ({ row }) => {
        return h(
          'span',
          row.original.starting_time ? formateDate(row.original.starting_time) : t('label.no_data')
        );
      },
    },

    {
      accessorKey: 'ending_time',
      header: t('label.ending_time'),
      cell: ({ row }) => {
        return h('span', row.original.ending_time ? formateDate(row.original.ending_time) : t('label.no_data'));
      },
    },
    {
      accessorKey: 'daily_limit',
      header: t('label.daily_limit'),
      cell: ({ row }) => {
        return h('span', row.original.daily_limit ?? t('label.no_data'));
      },
    },


    {
      id: 'actions',
      cell: ({ row }) => {
        return h(UIDropdownMenu, { items: getDropdownItems(row.original) });
      },
    },
  ];


  const listItems = computed(() => (item: ICampaign) => [
    { title: t('label.starting_time'), value: item.starting_time ? formateDate(item.starting_time) : t('label.no_data') },
    { title: t('label.ending_time'), value: item.ending_time ? formateDate(item.ending_time) : t('label.no_data') },
    { title: t('label.daily_limit'), value: item.daily_limit ?? t('label.no_data') },
    { title: t('label.description'), value: item.description ?? t('label.no_data'), },
  ]);
  const getDropdownItems = (item: ICampaign): DropdownMenuItem[] => {
    return [
      [
        {
          label: t('button.edit'),
          color: 'primary',
          icon: 'i-lucide-pencil',
          to: { name: 'edit-campaign', params: { id: item.id } },
        },
        {
          label: t('button.send_offer'),
          color: 'warning',
          icon: 'i-lucide-send',
          onSelect: () => {
            campaignId.value = item.id;
            sendOffer.value = true;
          },
        },
      ],
      [
        {
          label: t('button.delete'),
          color: 'error',
          icon: 'i-lucide-trash',
          onSelect: () => {
            campaignId.value = item.id;
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
    loading,
    sendOffer,
    loadingOffer,
    sendOfferConfirm,
  };
};