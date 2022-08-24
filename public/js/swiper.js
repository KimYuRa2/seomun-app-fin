/* main 배너 */

      var swiper_image = new Swiper(".swiper_image", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        // pagination: {
        //   el: ".swiper-pagination",
        //   type: "progressbar",
        // },
      });

      var swiper_text = new Swiper(".swiper_text", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          disableOnInteraction: false,
        },
      });

      var swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: 2.3,
        spaceBetween: 15,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 25,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      /* main페이지 swiper2개 연동 */
      swiper_image.controller.control = swiper_text;
      swiper_text.controller.control = swiper_image;
