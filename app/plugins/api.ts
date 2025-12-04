import type { FetchOptions } from 'ofetch';
import { ContactModule } from '~/repository/modules/contact'; 

export default defineNuxtPlugin((nuxtApp) => {
  const { state } = useAuthStore()
  const { validationErrors } = useErrorsStore()
  const { setMeta } = useQueryStore()
  const i18n = nuxtApp.$i18n as any;
  const runtimeConfig = useRuntimeConfig()
  const fetchOptions: FetchOptions = {
    baseURL: runtimeConfig.public.apiBase,
    keepalive: false,
    headers: {
      'Accept-Language': i18n.locale.value,
    },
    onRequest({ options }) {
      if (state.value?.token) {
        options.headers.set('Authorization', `Bearer ${state.value?.token}`)
      }
    },
    onResponse({ response }) {
      if (response?._data?.meta) {
        setMeta(response?._data?.meta);
      }
      const message = response?._data?.message;
      if (message && response.ok) {
        useToast().add({
          duration: 3000,
          description: message,
          color: 'success',
        });
      }
    },
    async onResponseError({ response }) {
      const message = response?._data?.error || response?._data?.message;
      if (message) {
        useToast().add({
          duration: 3000,
          description: message,
          color: 'error',
        });
      }
      if (response?._data?.errors) {
        validationErrors.value = response?._data?.errors;
      }
   
    },
  }
  const api = $fetch.create(fetchOptions)
  
  const websiteApi = $fetch.create({
    ...fetchOptions,
    baseURL: runtimeConfig.public.apiBase + '',
  })
  const modules = { 
    contactUs: new ContactModule(websiteApi), 
  }
  // Expose to useNuxtApp().$api
  // Expose to useNuxtApp().$http
  return {
    provide: {
      api,
      http: modules,
    },
  }
})

