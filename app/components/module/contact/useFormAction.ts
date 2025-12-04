import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';

export type FormField = 'industry' | 'fleet_size' | 'first_name' | 'last_name' | 'phone' | 'company_name' | 'company_email';

// Fields to validate per step
export const stepFields: Record<number, FormField[]> = {
  1: ['industry'],
  2: ['fleet_size'],
  3: ['first_name', 'last_name', 'phone', 'company_name', 'company_email'],
};

export const useFormAction = () => {
  const currentStep = ref(1);
  const { t } = useI18n();

  // Single schema with ALL fields - values won't be cleared between steps
  const validationSchema = computed(() =>
    toTypedSchema(
      object({
        industry: string().required(t('errors.required')),
        fleet_size: string().required(t('errors.required')),
        first_name: string().required(t('errors.required')),
        last_name: string().required(t('errors.required')),
        phone: string().required(t('errors.required')),
        company_name: string().required(t('errors.required')),
        company_email: string().required(t('errors.required')).email(t('errors.email')),
      })
    )
  );

  return {
    validationSchema,
    currentStep,
    stepFields,
  };
};
