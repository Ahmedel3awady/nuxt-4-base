export const contactTypes = {
  whats_app: 'whats_app',
  phone_call: 'phone_call',
  place_visit: 'place_visit',
};

export const contactType = (type: string) => {
  const { t } = useI18n();
  return t(`contact_types.${type}`);
};

export const contactTypesOptions = computed(() => {
  return Object.entries(contactTypes).map(([key, value]) => ({
    name: contactType(key),
    value: key,
  }));
});