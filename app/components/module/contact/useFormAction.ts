import { object, string } from "yup";
export const useFormAction = () => {
  const currentStep = ref(1);
  const { t } = useI18n();
  const schemaSteps = {
    1: object({
      industry: string().required(t("errors.required")),
    }),
    2: object({
      fleet_size: string().required(t("errors.required")),
    }),
    3: object({
      first_name: string().required(t("errors.required")),
      last_name: string().required(t("errors.required")),
      phone: string().required(t("errors.required")),
      company_name: string().required(t("errors.required")),
      company_email: string().required(t("errors.required")),
    }),
  }
  const validationSchema = computed(() => {
    return toTypedSchema(schemaSteps[currentStep.value as keyof typeof schemaSteps]);
  })
  return {
    validationSchema,
    currentStep,
  }
}