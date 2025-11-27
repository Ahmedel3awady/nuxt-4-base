export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { resetQuery, state } = useQueryStore();

  // Extract base module from path (e.g., /doctors/123/edit -> doctors)
  const getBaseModule = (path: string): string => {
    return path.split('/').filter(Boolean)[0] || '';
  };

  router.afterEach((to, from) => {
    // Skip if no previous route or same path
    if (!from?.path || to.path === from.path) return;

    // Check if there's any state to clear
    const hasState = Object.keys(state.value.query).length > 0 || state.value.meta.last_page > 1;
    if (!hasState) return;

    // Get base modules
    const fromModule = getBaseModule(from.path);
    const toModule = getBaseModule(to.path);

    // Reset query and pagination state when:
    // 1. Switching to different module
    // 2. Navigating away from index page within same module (e.g., index -> view/edit)
    if (fromModule !== toModule) {
      resetQuery();
    } else if (from.path.split('/').filter(Boolean).length === 1 && to.path.split('/').filter(Boolean).length > 1 && fromModule === toModule) {
      // Clear queries when navigating from index (e.g., /customer-subscriptions) to detail/view page
      resetQuery();
    }
  });
});
