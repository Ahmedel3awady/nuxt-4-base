import type { VNode } from "vue";

export interface IListingItem {
  title: string;
  icon?: string;
  value?: string | VNode | number | boolean;
  class?: string;
  valueClass?: string;
}
export interface IMeta {
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
}
export * from './faq';
export * from './product';

