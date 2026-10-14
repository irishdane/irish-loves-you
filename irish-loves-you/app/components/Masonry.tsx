"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { gsap } from "gsap";
import "./Masonry.css";

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  alt?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const MEDIA_QUERIES = [
  "(min-width: 1500px)",
  "(min-width: 1000px)",
  "(min-width: 600px)",
  "(min-width: 400px)",
];
const MEDIA_COLUMNS = [5, 4, 3, 2];
const DEFAULT_COLUMNS = 1;
const BALANCED_CARD_HEIGHT = 220;

function useColumnCount() {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  useEffect(() => {
    const mediaQueries = MEDIA_QUERIES.map((query) => window.matchMedia(query));
    const updateColumns = () => {
      const matchedIndex = mediaQueries.findIndex((query) => query.matches);
      setColumns(MEDIA_COLUMNS[matchedIndex] ?? DEFAULT_COLUMNS);
    };

    updateColumns();
    mediaQueries.forEach((query) => query.addEventListener("change", updateColumns));
    return () => mediaQueries.forEach((query) => query.removeEventListener("change", updateColumns));
  }, []);

  return columns;
}

function useContainerWidth<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return [containerRef, width] as const;
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

function getEntryPosition(
  direction: NonNullable<MasonryProps["animateFrom"]>,
  item: GridItem,
  container: HTMLElement,
) {
  const rect = container.getBoundingClientRect();
  switch (direction) {
    case "top":
      return { x: item.x, y: -item.h - 40 };
    case "bottom":
      return { x: item.x, y: window.innerHeight + 40 };
    case "left":
      return { x: -item.w - 40, y: item.y };
    case "right":
      return { x: window.innerWidth + 40, y: item.y };
    case "center":
      return {
        x: rect.width / 2 - item.w / 2,
        y: rect.height / 2 - item.h / 2,
      };
    case "random": {
      const directions = ["top", "bottom", "left", "right"] as const;
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      return getEntryPosition(randomDirection, item, container);
    }
    default:
      return { x: item.x, y: item.y + 100 };
  }
}

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useColumnCount();
  const [containerRef, width] = useContainerWidth<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    let active = true;
    Promise.all(items.map((item) => preloadImage(item.img))).then(() => {
      if (active) setImagesReady(true);
    });
    return () => {
      active = false;
    };
  }, [items]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reduceMotion.current = mediaQuery.matches;
    };
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const grid = useMemo(() => {
    if (!width || !items.length) return [];

    const columnHeights = Array.from({ length: columns }, () => 0);
    const baseItemsPerColumn = Math.floor(items.length / columns);
    const extraItems = items.length % columns;
    const targetColumnHeight = Math.max(1, baseItemsPerColumn) * BALANCED_CARD_HEIGHT;
    const remainingSlots = Array.from(
      { length: columns },
      (_, column) => baseItemsPerColumn + (column < extraItems ? 1 : 0),
    );
    const columnWidth = width / columns;
    const balancedItems = [...items].sort((first, second) => second.height - first.height);

    return balancedItems.map((item) => {
      const availableColumns = columnHeights
        .map((columnHeight, index) => ({ columnHeight, index }))
        .filter(({ index }) => remainingSlots[index] > 0);
      const column = availableColumns.reduce((shortest, current) =>
        current.columnHeight < shortest.columnHeight ? current : shortest,
      ).index;
      const height = targetColumnHeight / (baseItemsPerColumn + (column < extraItems ? 1 : 0));
      const gridItem: GridItem = {
        ...item,
        x: columnWidth * column,
        y: columnHeights[column],
        w: columnWidth,
        h: height,
      };
      columnHeights[column] += height;
      remainingSlots[column] -= 1;
      return gridItem;
    });
  }, [columns, items, width]);

  const gridHeight = grid.reduce((height, item) => Math.max(height, item.y + item.h), 0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !imagesReady || !grid.length) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-masonry-item]"));
    if (reduceMotion.current) {
      elements.forEach((element, index) => {
        const item = grid[index];
        if (item) gsap.set(element, { x: item.x, y: item.y, width: item.w, height: item.h, opacity: 1, clearProps: "filter" });
      });
      hasMounted.current = true;
      return;
    }

    const animations: gsap.core.Tween[] = [];
    grid.forEach((item, index) => {
      const element = elements[index];
      if (!element) return;

      if (!hasMounted.current) {
        const start = getEntryPosition(animateFrom, item, container);
        gsap.set(element, {
          x: start.x,
          y: start.y,
          width: item.w,
          height: item.h,
          opacity: 0,
          filter: blurToFocus ? "blur(10px)" : "none",
        });
        animations.push(
          gsap.to(element, {
            x: item.x,
            y: item.y,
            opacity: 1,
            filter: "blur(0px)",
            duration: Math.max(duration, 0.8),
            ease: "power3.out",
            delay: index * stagger,
          }),
        );
      } else {
        animations.push(
          gsap.to(element, {
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            duration,
            ease,
            overwrite: "auto",
          }),
        );
      }
    });
    hasMounted.current = true;

    return () => animations.forEach((animation) => animation.kill());
  }, [animateFrom, blurToFocus, containerRef, duration, ease, grid, imagesReady, stagger]);

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    if (!scaleOnHover || reduceMotion.current) return;
    gsap.to(event.currentTarget, { scale: hoverScale, duration: 0.3, ease: "power2.out" });
    if (colorShiftOnHover) {
      gsap.to(event.currentTarget.querySelector(".masonry__overlay"), { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    if (!scaleOnHover || reduceMotion.current) return;
    gsap.to(event.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
    if (colorShiftOnHover) {
      gsap.to(event.currentTarget.querySelector(".masonry__overlay"), { opacity: 0, duration: 0.3 });
    }
  };

  const containerStyle = { height: gridHeight } satisfies CSSProperties;

  return (
    <div className="masonry" ref={containerRef} style={containerStyle}>
      {grid.map((item) => (
        <button
          className="masonry__item"
          data-masonry-item
          key={item.id}
          type="button"
          aria-label={item.alt ?? "Open photo"}
          style={{ width: item.w, height: item.h }}
          onClick={() => {
            if (item.url && item.url !== "#") window.open(item.url, "_blank", "noopener,noreferrer");
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="masonry__image"
            role="img"
            aria-label={item.alt ?? ""}
            style={{ backgroundImage: `url("${item.img}")` }}
          />
          {colorShiftOnHover && <span className="masonry__overlay" aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}