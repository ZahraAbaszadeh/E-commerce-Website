import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "./SwiperSlider.module.css";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-flip";
import "swiper/css/effect-creative";
import "swiper/css/effect-cards";

export const SwiperSlider = (props) => {
  if (props.items.length > 1) {
    require("./publicSwiperStyle.css");
  }

  return (
    <>
      <Swiper
        dir={props.dir || "rtl"}
        effect={props.effect || "fade"}
        style={{
          width: props.width ?? "100%",
          height: props.height ?? "100%",
          borderRadius: props.borderRadius ?? "0rem",
          "--swiper-navigation-color": props.navigationColor ? "#fff" : "#fff",
          "--swiper-pagination-color": props.paginationColor ? "#fff" : "#fff",
        }}
        grabCursor={props.grabCursor ?? true}
        spaceBetween={props.spaceBetween ?? 30}
        centeredSlides={true}
        zoom={props.zoom ?? false}
        autoplay={{
          delay: props.autoplayDelay ?? 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={props.navigationIcon ?? true}
        modules={props.modules ?? []}
        className={Styles.mySwiper + " " + props.className}
        slidesPerView={props.slidesPerView ?? 1}
        slidesPerGroup={props.slidesPerGroup ?? 1}
        loop={props.loop ?? true}
        loopFillGroupWithBlank={props.loopFillGroupWithBlank ?? true} //stop autoplay on hover (for desktop)
      >
        {props.items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={Styles.slide}>
                <div className={Styles.slideImage}>
                  <img src={item.image} />
                </div>
                <div className={Styles.slideContent}>
                  <div className={Styles.slideTitle}>
                    <h2>{item.title}</h2>
                  </div>
                  <div className={Styles.slideDescription}>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

SwiperSlider.propTypes = {
  items: PropTypes.array.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  spaceBetween: PropTypes.number,
  slidesPerView: PropTypes.number,
  slidesPerGroup: PropTypes.number,
  loop: PropTypes.bool,
  loopFillGroupWithBlank: PropTypes.bool,
  modules: PropTypes.array,
  grabCursor: PropTypes.bool,
  navigationIcon: PropTypes.bool,
  className: PropTypes.string,
  autoplayDelay: PropTypes.number,
  effect: PropTypes.string,
  dir: PropTypes.string,
  paginationColor: PropTypes.string,
  navigationColor: PropTypes.string,
  zoom: PropTypes.bool,
};
