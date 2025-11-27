export const isEdit = () => {
  const route = useRoute();
  return route.name?.toString().includes('edit');
}