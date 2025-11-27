/**
 * Extract filter name from composable file path
 * @example useOrdersFilter.ts → orders
 * @example useReservationsFilter.ts → reservations
 */
export const extractFilterName = (path: string): string | null => {
  const match = path.match(/use(.+)Filter\.ts$/);
  return match?.[1]?.toLowerCase() || null;
};

/**
 * Build composable map from glob imports
 * Automatically maps filter names to their composable functions
 */
export const buildComposableMap = (
  filterComposables: Record<string, any>
): Record<string, () => any> => {
  return Object.entries(filterComposables).reduce((acc, [path, module]) => {
    const filterName = extractFilterName(path);
    if (filterName) {
      acc[filterName] = module.default || Object.values(module)[0];
    }
    return acc;
  }, {} as Record<string, () => any>);
};

/**
 * Get component from component map by filter name
 */
export const getFilterComponent = (
  filterComponents: Record<string, any>,
  filterName: string
): any => {
  return filterComponents[`./page/${filterName}.vue`]?.default;
};

/**
 * Call composable and return data if exists
 */
export const getFilterData = (
  composableMap: Record<string, () => any>,
  filterName: string
): any => {
  return (filterName && composableMap[filterName]?.()) || null;
};

