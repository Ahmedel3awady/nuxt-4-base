
import type { ICampaign } from "~/types/campaign";
import { FetchFactory } from "../factory";

export class CampaignsModule extends FetchFactory {
  private RESOURCE = 'campaigns';
  getCampaigns() {
    return useLazyAsyncData('campaigns', () => this.$fetch<{ data: ICampaign[] }>(this.RESOURCE), {
      transform: (res: { data: ICampaign[] }) => res?.data,
    });
  }
  storeCampaign(data: FormData) {
    return this.$fetch<{ data: ICampaign }>(this.RESOURCE, {
      method: 'POST',
      body: data,
    });
  }

  updateCampaign(id: number, data: FormData) {
    return this.$fetch<{ data: ICampaign }>(`${this.RESOURCE}/${id}`, {
      method: 'POST',
      body: data,
    });
  }

  getCampaign(id: number) {
    return this.$fetch<{ data: ICampaign }>(`${this.RESOURCE}/${id}`, {
      method: 'GET',
    });
  }

  deleteCampaign(id: number) {
    return this.$fetch(`${this.RESOURCE}/${id}`, {
      method: 'POST',
      body: { _method: 'DELETE' },
    });
  }

  sendOfferCampaign(id: number) {
    return this.$fetch(`${this.RESOURCE}/send/${id}`, {
      method: 'GET',
    });
  }
}