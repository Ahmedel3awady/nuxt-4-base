export const useHttp = <T = any>(url: string, options?: any) => {
  const { $api } = useNuxtApp();

  const result = useLazyFetch<T>(url, {
    lazy: true,
    dedupe: 'defer',
    watch: false, // Disable automatic watching to prevent AbortError
    immediate: true, // Fetch immediately on mount
    $fetch: $api,
    ...options
  });

  // Automatically watch query parameters if they exist and are reactive
  if (options?.query) {
    watch(
      options.query,
      () => {
        result.refresh();
      },
      { deep: true }
    );
  }

  return result;
};
