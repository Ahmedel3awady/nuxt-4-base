import { OrderStatusEnums } from "~/enums/orderStatusEnums";
import type { ITicket } from "~/types/ticket";

export const ticketStatus = (item: ITicket | null): { status: string; label: string; style: string } => {
  if (!item) {
    return {
      status: OrderStatusEnums.FOLLOW_UP,
      label: 'ticket_followed',
      style: 'border-follow-up',
    };
  }

  if (item.status == 'follow') {
    return {
      status: OrderStatusEnums.FOLLOW_UP,
      label: 'ticket_followed',
      style: 'border-follow-up',
    };
  }
  if (item.status == 'closed') {
    return {
      status: OrderStatusEnums.FAILED,
      label: 'ticket_closed',
      style: 'border-error',
    };
  }
  if (item.status == 'replied') {
    return {
      status: OrderStatusEnums.DONE,
      label: 'ticket_replied',
      style: 'border-success',
    };
  }

  // Default fallback
  return {
    status: OrderStatusEnums.FOLLOW_UP,
    label: 'ticket_followed',
    style: 'border-follow-up',
  };
};