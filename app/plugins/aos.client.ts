import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook('page:finish', () => {
      AOS.refresh()
    })

    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      offset: 100,
    })
  }
})