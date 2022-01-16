// core version + navigation, pagination modules:
import Swiper, { Pagination, Scrollbar } from 'swiper'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)
const isMobile = !!(md.phone() || md.tablet())

let isDocumentReady = false

window.addEventListener('load', (e) => {
  isDocumentReady = true
})

document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line
  new Swiper('.swiper', {
    modules: [Pagination, Scrollbar],
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    mousewheel: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
      draggable: true
    }
  })

  // eslint-disable-next-line
  new Swiper('.swiper-video-container', {
    modules: [Pagination],
    watchState: true,
    preventInteractionOnTransition: true,
    loop: true,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: 'true'
    },
    on: {
      slideChangeTransitionStart: () => {
        if (isDocumentReady && !isMobile) {
          const activevideo = document.querySelector('.swiper-slide-active .module-banner-video')

          activevideo && activevideo.play()
        }
      },
      slideChangeTransitionEnd: () => {
        if (isDocumentReady && !isMobile) {
          const nextvideo = document.querySelector('.swiper-slide-next .module-banner-video')
          const prevvideo = document.querySelector('.swiper-slide-prev .module-banner-video')

          if (prevvideo || nextvideo) {
            prevvideo && prevvideo.pause()
            nextvideo && nextvideo.pause()
          }
        }
      }
    }
  })
})
