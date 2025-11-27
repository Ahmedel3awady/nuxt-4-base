import { OrderStatusEnums } from "~/enums/orderStatusEnums";

export interface IStatus {
  id: number;
  name: string;
  style: string;
  bgColor: string;
  color: string;
  hexColor: string;
  icon: string;
}

// Static config - no translations, no recreation
const STATUS_CONFIG: Record<OrderStatusEnums, Omit<IStatus, 'name'>> = {
  [OrderStatusEnums.ALL]: {
    id: 0,
    style: 'text-gray-400 bg-gray-400/20',
    bgColor: 'bg-gray-400',
    color: 'text-gray-400',
    icon: 'all_status',
    hexColor: 'var(--color-gray-400)',
  },
  [OrderStatusEnums.NEW]: {
    id: 1,
    style: 'text-new bg-new/20',
    bgColor: 'bg-new',
    color: 'text-new',
    icon: 'new_status',
    hexColor: 'var(--color-new)',
  },
  [OrderStatusEnums.FOLLOW_UP]: {
    id: 2,
    style: 'text-follow-up bg-follow-up/20',
    bgColor: 'bg-follow-up',
    color: 'text-follow-up',
    icon: 'follow_up_status',
    hexColor: 'var(--color-follow-up)',
  },
  [OrderStatusEnums.DONE]: {
    id: 3,
    style: 'text-done bg-done/20',
    bgColor: 'bg-done',
    color: 'text-done',
    icon: 'done_status',
    hexColor: 'var(--color-done)',
  },
  [OrderStatusEnums.FAILED]: {
    id: 4,
    style: 'text-failed bg-failed/20',
    bgColor: 'bg-failed',
    color: 'text-failed',
    icon: 'failed_status',
    hexColor: 'var(--color-failed)',
  },
  [OrderStatusEnums.RESERVATION]: {
    id: 5,
    style: 'text-reservation bg-reservation/20',
    bgColor: 'bg-reservation',
    color: 'text-reservation',
    icon: 'reservation_status',
    hexColor: 'var(--color-reservation)',
  },
}

// Returns Record with translated keys (same structure as before)
export const getStatuses = (): Record<string, IStatus> => {
  const { t } = useI18n()
  const statuses: Record<string, IStatus> = {}

  Object.entries(STATUS_CONFIG).forEach(([key, config]) => {
    const translatedKey = t(`status.${key}`)
    statuses[translatedKey] = {
      ...config,
      name: translatedKey
    }
  })

  return statuses
}

export const statusType = (status?: string): IStatus | undefined => {
  if (!status) return undefined;

  // First try to find by enum value directly in STATUS_CONFIG
  if (status in STATUS_CONFIG) {
    const config = STATUS_CONFIG[status as OrderStatusEnums];
    const { t } = useI18n();
    return {
      ...config,
      name: t(`status.${status}`)
    };
  }

  // Fallback to translated lookup
  return getStatuses()[status as string];
}