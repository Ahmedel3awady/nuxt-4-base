export const useErrorsStore = () => {
  const validationErrors = useState<Record<string, string[]>>('validationErrors', () => ({}));

  const resetErrors = () => {
    validationErrors.value = {};
  };
  return { validationErrors, resetErrors };
};  