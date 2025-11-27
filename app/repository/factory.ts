import type { $Fetch } from "nitropack";

export class FetchFactory {
  protected queryStore: ReturnType<typeof useQueryStore>;

  constructor(protected $fetch: $Fetch) {
    this.queryStore = useQueryStore();
  }
} 