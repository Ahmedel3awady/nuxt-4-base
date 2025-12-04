import { useErrorsStore } from "~/store/errors";

export const useCustomField = <T = string>(name: string) => {
  const { value, errors, setErrors, ...rest } = useField<T>(name);
  const errorsStore = useErrorsStore();
  const { validationErrors } = errorsStore;
  const error = computed(() => validationErrors.value[name]);

  // Set server validation errors
  watchEffect(() => {
    if (error.value) {
      setErrors(error.value || '');
    }
  });

  // Clear server error when user types
  watch(value, () => {
    if (error.value) {
      delete validationErrors.value[name];
    }
  });

  return { value, errors, setErrors, ...rest };
};