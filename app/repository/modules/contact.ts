
import type { IContact } from "~/types/contact";
import { FetchFactory } from "../factory";

export class ContactModule extends FetchFactory {
  private RESOURCE = 'contact-us';
  
  storeContact(data: FormData) {
    return this.$fetch<{ data: IContact }>(this.RESOURCE, {
      method: 'POST',
      body: data,
    });
  }
  
  
}