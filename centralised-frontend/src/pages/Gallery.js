import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import "./Gallery.css";
import sidephoto from "../assets/gallery/sidegallery.png";

// Keep the existing gallery image imports and paths.
import image1 from "../assets/gallery/gallery/1.jpg";
import image2 from "../assets/gallery/gallery/2.JPG";
import image3 from "../assets/gallery/gallery/3.JPG";
import image4 from "../assets/gallery/gallery/4.png";
import image5 from "../assets/gallery/gallery/5.JPG";
import image6 from "../assets/gallery/gallery/6.JPG";
import image7 from "../assets/gallery/gallery/7.JPG";
import image8 from "../assets/gallery/gallery/8.JPG";
import image9 from "../assets/gallery/gallery/9.JPG";
import image10 from "../assets/gallery/gallery/10.png";
import image11 from "../assets/gallery/gallery/11.png";
import image12 from "../assets/gallery/gallery/12.png";
import image13 from "../assets/gallery/gallery/13.png";
import image14 from "../assets/gallery/gallery/14.png";
import image15 from "../assets/gallery/gallery/15.png";
import image16 from "../assets/gallery/gallery/16.png";
import image17 from "../assets/gallery/gallery/17.png";
import image18 from "../assets/gallery/gallery/18.png";
import image19 from "../assets/gallery/gallery/19.png";
import image20 from "../assets/gallery/gallery/20.png";
import image21 from "../assets/gallery/gallery/21.jpeg";
import image22 from "../assets/gallery/gallery/22.jpeg";
import image23 from "../assets/gallery/gallery/23.jpeg";
import image24 from "../assets/gallery/gallery/24.JPG";
import image25 from "../assets/gallery/gallery/25.JPG";
import image26 from "../assets/gallery/gallery/26.JPG";
import image27 from "../assets/gallery/gallery/27.JPG";
import image28 from "../assets/gallery/gallery/28.JPG";
import image29 from "../assets/gallery/gallery/29.JPG";
import image30 from "../assets/gallery/gallery/30.JPG";
import image31 from "../assets/gallery/gallery/31.png";
import image32 from "../assets/gallery/gallery/32.JPG";
import image33 from "../assets/gallery/gallery/33.png";
import image34 from "../assets/gallery/gallery/34.JPG";
import image35 from "../assets/gallery/gallery/35.jpeg";

// Keep each imported image in the same order as the original gallery.
const images = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
  image31, image32, image33, image34, image35,
];

// Tune the layout, gesture, timing, and transition values here.
const CONFIG = {
  // Viewport sizing and image sampling.
  RESIZE_DEBOUNCE_MS: 150,
  MOBILE_BREAKPOINT_PX: 700,
  MOBILE_CARD_WIDTH_FACTOR: 0.84,
  DESKTOP_CARD_WIDTH_FACTOR: 0.52,
  MAX_CARD_WIDTH_PX: 760,
  CARD_HEIGHT_FACTOR: 0.75,
  FIRST_EAGER_IMAGE_COUNT: 4,

  // Ring geometry; the radius is multiplied by the smaller viewport dimension.
  RING_COUNT: 8,
  RING_START_DEG: -90,
  FULL_TURN_DEG: 360,
  RING_RADIUS_VMIN: 0.3,
  RING_SCALE: 0.38,
  RING_DRIFT_SCALE: 0.94,
  RING_ORBIT_ROTATION_DEG: 360,
  RING_ORBIT_DURATION: 36,
  COLLAPSED_RING_SCALE: 0.2,

  // Stack and fan geometry.
  STACK_MAX_LEVEL: 4,
  STACK_X_OFFSET_PX: 10,
  STACK_Y_OFFSET_PX: 8,
  STACK_SCALE_STEP: 0.02,
  STACK_ROTATION_DEG: 1.5,
  FAN_OFFSET_MULTIPLIER: 3,

  // Carousel geometry.
  CAROUSEL_GAP_FACTOR: 0.62,
  CAROUSEL_SCALE_STEP: 0.18,
  CAROUSEL_OPACITY_STEP: 0.35,
  CAROUSEL_VISIBLE_OFFSET: 2,
  BLUR_PER_STEP_PX: 6,

  // Intro and layout hold durations are in milliseconds.
  STACK_HOLD_MS: 900,
  FAN_HOLD_MS: 800,
  RING_HOLD_MS: 3200,
  STACK_RETURN_RING_HOLD_MS: 700,

  // Input timing and step locks are in milliseconds.
  AUTOPLAY_INTERVAL_MS: 1800,
  WHEEL_LOCK_MS: 600,
  SWIPE_THRESHOLD_PX: 50,
  OVERVIEW_LOCK_MS: 1000,
  RING_TO_CAROUSEL_LOCK_MS: 1300,
  STACK_RETURN_LOCK_MS: 2000,

  // Motion durations are in seconds; delays are also in seconds.
  STACK_TO_FAN_DURATION: 0.5,
  FAN_TO_RING_DURATION: 0.6,
  RING_TO_CAROUSEL_DURATION: 0.9,
  CAROUSEL_STEP_DURATION: 0.6,
  RETURN_TO_STACK_DURATION: 0.7,
  DEFAULT_DURATION: 0.7,
  RING_DRIFT_DURATION: 2,
  RING_RANK_DELAY_SECONDS: 0.03,
  CAROUSEL_OFFSET_DELAY_SECONDS: 0.02,

  // Cubic-bezier easing curves for the declared transforms.
  STACK_TO_FAN_EASE: [0.22, 1, 0.36, 1],
  FAN_TO_RING_EASE: [0.22, 1, 0.36, 1],
  RING_TO_CAROUSEL_EASE: [0.65, 0, 0.35, 1],
  RETURN_TO_STACK_EASE: [0.65, 0, 0.35, 1],
  DEFAULT_EASE: [0.22, 1, 0.36, 1],
};

// Track the viewport with a short debounce so resize events do not churn every card.
const useViewportSize = () => {
  const readViewport = () => ({
    w: typeof window === "undefined" ? 0 : window.innerWidth,
    h: typeof window === "undefined" ? 0 : window.innerHeight,
  });
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    let resizeTimer;
    const updateViewport = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setViewport(readViewport()), CONFIG.RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", updateViewport);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return viewport;
};

// Find the current image's sampled ring slot; the active image always maps to slot zero.
const getRingSlot = (imageIndex, activeIndex, count) => {
  for (let slot = 0; slot < CONFIG.RING_COUNT; slot += 1) {
    const sampledIndex =
      (activeIndex + Math.floor((slot * count) / CONFIG.RING_COUNT)) % count;
    if (sampledIndex === imageIndex) return slot;
  }
  return -1;
};

// Keep signed carousel offsets consistent between the layout and transition calculations.
const getWrappedOffset = (index, activeIndex, count) => {
  let offset = ((index - activeIndex) % count + count) % count;
  if (offset > count / 2) offset -= count;
  return offset;
};

// Calculate a card's target transform and appearance from only the layout state and viewport.
const getLayout = (mode, index, activeIndex, count, viewport, cardWidth) => {
  const offset = getWrappedOffset(index, activeIndex, count);

  if (mode === "ring") {
    const slot = getRingSlot(index, activeIndex, count);
    if (slot < 0) {
      return {
        x: 0,
        y: 0,
        scale: CONFIG.COLLAPSED_RING_SCALE,
        rotate: 0,
        opacity: 0,
        filter: "blur(0px)",
        zIndex: 0,
      };
    }

    const angle =
      (CONFIG.RING_START_DEG + (slot * CONFIG.FULL_TURN_DEG) / CONFIG.RING_COUNT) *
      (Math.PI / 180);
    const radius = Math.min(viewport.w, viewport.h) * CONFIG.RING_RADIUS_VMIN;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      scale: CONFIG.RING_SCALE,
      rotate: 0,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: count - slot,
    };
  }

  if (mode === "carousel") {
    const distance = Math.abs(offset);
    return {
      x: offset * cardWidth * CONFIG.CAROUSEL_GAP_FACTOR,
      y: 0,
      scale: 1 - CONFIG.CAROUSEL_SCALE_STEP * distance,
      rotate: 0,
      opacity:
        distance > CONFIG.CAROUSEL_VISIBLE_OFFSET
          ? 0
          : 1 - CONFIG.CAROUSEL_OPACITY_STEP * distance,
      filter: `blur(${distance * CONFIG.BLUR_PER_STEP_PX}px)`,
      zIndex: count - distance,
    };
  }

  const distance = Math.abs(offset);
  const level = Math.min(distance, CONFIG.STACK_MAX_LEVEL);
  const spread = mode === "fan" ? CONFIG.FAN_OFFSET_MULTIPLIER : 1;
  const side = offset < 0 ? -1 : 1;
  const alternatingDirection = level % 2 === 0 ? 1 : -1;

  return {
    x: -CONFIG.STACK_X_OFFSET_PX * level * spread,
    y: CONFIG.STACK_Y_OFFSET_PX * level * spread,
    scale: 1 - CONFIG.STACK_SCALE_STEP * level,
    rotate:
      distance === 0
        ? 0
        : side * alternatingDirection * CONFIG.STACK_ROTATION_DEG,
    opacity: distance <= CONFIG.STACK_MAX_LEVEL ? 1 : 0,
    filter: "blur(0px)",
    zIndex: count - distance,
  };
};

// Select the tween and stagger based on the layout transition in progress.
const getCardTransition = (mode, preset, ringSlot, offset, reducedMotion) => {
  if (reducedMotion) return { duration: 0 };

  if (preset === "stack-fan") {
    return {
      type: "tween",
      duration: CONFIG.STACK_TO_FAN_DURATION,
      ease: CONFIG.STACK_TO_FAN_EASE,
    };
  }
  if (preset === "fan-ring") {
    return {
      type: "tween",
      duration: CONFIG.FAN_TO_RING_DURATION,
      ease: CONFIG.FAN_TO_RING_EASE,
      delay: ringSlot < 0 ? 0 : ringSlot * CONFIG.RING_RANK_DELAY_SECONDS,
    };
  }
  if (preset === "ring-carousel" && mode === "carousel") {
    return {
      type: "tween",
      duration: CONFIG.RING_TO_CAROUSEL_DURATION,
      ease: CONFIG.RING_TO_CAROUSEL_EASE,
      delay: Math.abs(offset) * CONFIG.CAROUSEL_OFFSET_DELAY_SECONDS,
    };
  }
  if (preset === "carousel-step") {
    return {
      type: "tween",
      duration: CONFIG.CAROUSEL_STEP_DURATION,
      ease: CONFIG.RING_TO_CAROUSEL_EASE,
    };
  }
  if (preset === "to-stack" && mode === "stack") {
    return {
      type: "tween",
      duration: CONFIG.RETURN_TO_STACK_DURATION,
      ease: CONFIG.RETURN_TO_STACK_EASE,
    };
  }

  return {
    type: "tween",
    duration: CONFIG.DEFAULT_DURATION,
    ease: CONFIG.DEFAULT_EASE,
  };
};

const Gallery = () => {
  const reducedMotion = Boolean(useReducedMotion());
  const [mode, setMode] = useState(reducedMotion ? "carousel" : "stack");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitionPreset, setTransitionPreset] = useState("default");
  const viewport = useViewportSize();
  const orbitRotation = useMotionValue(0);
  const cardCounterRotation = useTransform(orbitRotation, (rotation) => -rotation);
  const imageRefs = useRef([]);
  const galleryStageRef = useRef(null);
  const lockRef = useRef(false);
  const lockTimerRef = useRef(null);
  const wheelLockRef = useRef(false);
  const wheelTimerRef = useRef(null);
  const returnTimerRef = useRef(null);
  const introWakeRef = useRef(null);
  const panMovedRef = useRef(false);

  // Derive the card's exact pixel dimensions once for both the layout and CSS styles.
  const cardWidth =
    viewport.w < CONFIG.MOBILE_BREAKPOINT_PX
      ? viewport.w * CONFIG.MOBILE_CARD_WIDTH_FACTOR
      : Math.min(viewport.w * CONFIG.DESKTOP_CARD_WIDTH_FACTOR, CONFIG.MAX_CARD_WIDTH_PX);
  const cardHeight = cardWidth * CONFIG.CARD_HEIGHT_FACTOR;

  // Keep the sampled ring images eager as the active image changes during ring navigation.
  const ringImageIndices = new Set(
    Array.from({ length: CONFIG.RING_COUNT }, (_, slot) =>
      (active + Math.floor((slot * images.length) / CONFIG.RING_COUNT)) % images.length
    )
  );

  // Hold the input lock until a transition or multi-layout selection has completed.
  const lockFor = useCallback((durationMs) => {
    lockRef.current = true;
    window.clearTimeout(lockTimerRef.current);
    lockTimerRef.current = window.setTimeout(() => {
      lockRef.current = false;
      lockTimerRef.current = null;
    }, durationMs);
  }, []);

  // Decode the opening ring images, then run one cancellable intro sequence.
  useEffect(() => {
    if (reducedMotion) {
      setMode("carousel");
      lockRef.current = false;
      return undefined;
    }

    let cancelled = false;
    const timers = new Set();
    lockRef.current = true;

    const wait = (durationMs) =>
      new Promise((resolve) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, durationMs);
        timers.add(timer);
        introWakeRef.current = () => {
          window.clearTimeout(timer);
          timers.delete(timer);
          resolve();
        };
      });

    const runIntro = async () => {
      const openingRingImages = Array.from({ length: CONFIG.RING_COUNT }, (_, slot) => {
        const imageIndex = Math.floor((slot * images.length) / CONFIG.RING_COUNT);
        return imageRefs.current[imageIndex];
      });

      await Promise.all(
        openingRingImages.map((image) =>
          image && typeof image.decode === "function"
            ? image.decode().catch(() => undefined)
            : Promise.resolve()
        )
      );
      if (cancelled) return;

      await wait(CONFIG.STACK_HOLD_MS);
      if (cancelled) return;
      setTransitionPreset("stack-fan");
      setMode("fan");

      await wait(CONFIG.FAN_HOLD_MS);
      if (cancelled) return;
      setTransitionPreset("fan-ring");
      setMode("ring");

      await wait(CONFIG.RING_HOLD_MS);
      if (cancelled) return;
      setTransitionPreset("ring-carousel");
      setMode("carousel");
      lockRef.current = false;
      introWakeRef.current = null;
    };

    runIntro();
    return () => {
      cancelled = true;
      if (introWakeRef.current) introWakeRef.current();
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(lockTimerRef.current);
      lockRef.current = false;
    };
  }, [reducedMotion]);

  // Autoplay advances the carousel only while it is visible and user interaction is paused.
  useEffect(() => {
    if (mode !== "carousel" || paused || reducedMotion) return undefined;

    const interval = window.setInterval(() => {
      if (document.hidden || lockRef.current) return;
      lockFor(CONFIG.CAROUSEL_STEP_DURATION * 1000);
      setTransitionPreset("carousel-step");
      setActive((current) => (current + 1) % images.length);
    }, CONFIG.AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [mode, paused, reducedMotion, lockFor]);

  // Clear pending input and transition timers when the gallery unmounts.
  useEffect(
    () => () => {
      window.clearTimeout(lockTimerRef.current);
      window.clearTimeout(wheelTimerRef.current);
      window.clearTimeout(returnTimerRef.current);
    },
    []
  );

  // Focus a neighbor card with a single carousel tween.
  const activateImage = useCallback(
    (index) => {
      if (lockRef.current || index === active) return;
      lockFor(CONFIG.CAROUSEL_STEP_DURATION * 1000);
      setTransitionPreset("carousel-step");
      setActive(index);
    },
    [active, lockFor]
  );

  // Cycle Overview layouts with Escape or the visible control.
  const cycleOverview = useCallback(() => {
    if (lockRef.current) return;
    lockFor(CONFIG.OVERVIEW_LOCK_MS);

    if (mode === "carousel") {
      setTransitionPreset("default");
      setMode("ring");
    } else if (mode === "ring") {
      setTransitionPreset("to-stack");
      setMode("stack");
    } else {
      setTransitionPreset("default");
      setMode("carousel");
    }
  }, [lockFor, mode]);

  // Handle keyboard navigation and layout cycling without stale layout state.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        if (lockRef.current) return;
        lockFor(CONFIG.CAROUSEL_STEP_DURATION * 1000);
        setTransitionPreset("carousel-step");
        setActive((current) =>
          (current + (event.key === "ArrowRight" ? 1 : -1) + images.length) % images.length
        );
      } else if (event.key === "Escape") {
        cycleOverview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cycleOverview, lockFor]);

  // Capture wheel gestures on cards so the rest of the page keeps native scrolling.
  const handleWheel = useCallback((event) => {
    const movement =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!movement) return;

    event.preventDefault();
    if (wheelLockRef.current || lockRef.current) return;

    wheelLockRef.current = true;
    wheelTimerRef.current = window.setTimeout(() => {
      wheelLockRef.current = false;
      wheelTimerRef.current = null;
    }, CONFIG.WHEEL_LOCK_MS);

    lockFor(CONFIG.CAROUSEL_STEP_DURATION * 1000);
    setTransitionPreset("carousel-step");
    setActive(
      (current) => (current + (movement > 0 ? 1 : -1) + images.length) % images.length
    );
  }, [lockFor]);

  useEffect(() => {
    const stage = galleryStageRef.current;
    if (!stage) return undefined;

    const handleStageWheel = (event) => {
      if (!(event.target instanceof Element) || !event.target.closest(".gallery-card")) return;
      handleWheel(event);
    };

    stage.addEventListener("wheel", handleStageWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleStageWheel);
  }, [handleWheel]);

  // Framer Motion pan callbacks turn horizontal drags into active-image steps.
  const handlePan = (_, info) => {
    if (Math.abs(info.offset.x) > CONFIG.SWIPE_THRESHOLD_PX) {
      panMovedRef.current = true;
    }
  };

  const handlePanEnd = (_, info) => {
    window.setTimeout(() => {
      panMovedRef.current = false;
    }, 0);

    if (Math.abs(info.offset.x) <= CONFIG.SWIPE_THRESHOLD_PX || lockRef.current) return;
    lockFor(CONFIG.CAROUSEL_STEP_DURATION * 1000);
    setTransitionPreset("carousel-step");
    setActive(
      (current) =>
        (current + (info.offset.x < 0 ? 1 : -1) + images.length) % images.length
    );
  };

  // Select a ring image directly, or return a stack selection through ring into carousel.
  const handleCardClick = (index) => {
    if (panMovedRef.current || lockRef.current) return;

    if (mode === "ring") {
      lockFor(CONFIG.RING_TO_CAROUSEL_LOCK_MS);
      setTransitionPreset("ring-carousel");
      setActive(index);
      setMode("carousel");
    } else if (mode === "carousel") {
      activateImage(index);
    } else {
      lockFor(CONFIG.STACK_RETURN_LOCK_MS);
      setActive(index);
      setTransitionPreset("fan-ring");
      setMode("ring");
      window.clearTimeout(returnTimerRef.current);
      returnTimerRef.current = window.setTimeout(() => {
        setTransitionPreset("ring-carousel");
        setMode("carousel");
        returnTimerRef.current = null;
      }, CONFIG.STACK_RETURN_RING_HOLD_MS);
    }
  };

  // Make visible cards operable by keyboard as well as by pointer.
  const handleCardKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick(index);
    }
  };

  // Retain the original page heading and description around the new interactive image stage.
  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Our Memories</h1>
        <p>Moments we've captured along our journey</p>
      </div>

      {/* Pause autoplay on hover or touch while keeping the stage ready for gestures. */}
      <motion.div
        ref={galleryStageRef}
        className="gallery-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {/* Scale the whole ring gently while all card transforms remain declarative. */}
        <motion.div
          className="gallery-orbit"
          style={{ rotate: orbitRotation }}
          animate={{
            scale: mode === "ring" && !reducedMotion ? CONFIG.RING_DRIFT_SCALE : 1,
            rotate:
              mode === "ring" && !reducedMotion
                ? CONFIG.RING_ORBIT_ROTATION_DEG
                : 0,
          }}
          transition={{
            scale: {
              duration: reducedMotion ? 0 : CONFIG.RING_DRIFT_DURATION,
              ease: "easeOut",
            },
            rotate:
              mode === "ring" && !reducedMotion
                ? {
                    duration: CONFIG.RING_ORBIT_DURATION,
                    ease: "linear",
                    repeat: Infinity,
                  }
                : { duration: reducedMotion ? 0 : CONFIG.DEFAULT_DURATION },
          }}
        >
          {images.map((src, index) => {
            const layout = getLayout(mode, index, active, images.length, viewport, cardWidth);
            const ringSlot = getRingSlot(index, active, images.length);
            const offset = Math.abs(getWrappedOffset(index, active, images.length));
            const target = reducedMotion
              ? { ...layout, filter: "blur(0px)" }
              : layout;

            return (
              <motion.div
                key={index}
                className="gallery-card"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardHeight / 2,
                  zIndex: layout.zIndex,
                  pointerEvents: layout.opacity === 0 ? "none" : "auto",
                }}
                animate={{
                  x: target.x,
                  y: target.y,
                  scale: target.scale,
                  rotate: target.rotate,
                  opacity: target.opacity,
                  filter: target.filter,
                }}
                transition={getCardTransition(
                  mode,
                  transitionPreset,
                  ringSlot,
                  offset,
                  reducedMotion
                )}
                onClick={() => handleCardClick(index)}
                onKeyDown={(event) => handleCardKeyDown(event, index)}
                role="button"
                tabIndex={layout.opacity === 0 ? -1 : 0}
                aria-label={`Show gallery image ${index + 1}`}
              >
                <motion.div
                  className="gallery-card-face"
                  style={{ rotate: cardCounterRotation }}
                >
                  <img
                    ref={(element) => {
                      imageRefs.current[index] = element;
                    }}
                    src={src}
                    alt={`SARC Memory ${index + 1}`}
                    draggable={false}
                    decoding="async"
                    loading={
                      index < CONFIG.FIRST_EAGER_IMAGE_COUNT || ringImageIndices.has(index)
                        ? "eager"
                        : "lazy"
                    }
                    onError={(event) => {
                      event.currentTarget.src = sidephoto;
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Overview cycles from carousel to ring, ring to stack, and stack back to carousel. */}
        <button
          type="button"
          className="gallery-overview"
          onClick={cycleOverview}
          aria-label={`Change gallery layout; current layout is ${mode}`}
        >
          Overview
        </button>
      </motion.div>
    </div>
  );
};

export default Gallery;
