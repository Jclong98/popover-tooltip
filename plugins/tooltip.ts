import type { Directive } from "vue";

export const POSITIONS = [
  "topCenter",
  "topLeft",
  "topRight",
  "bottomCenter",
  "bottomLeft",
  "bottomRight",
  "left",
  "right",
] as const;
export type Position = (typeof POSITIONS)[number];

function findFirstValidPosition(modifiers: Record<Position, boolean>) {
  for (const key of Object.keys(modifiers)) {
    if (POSITIONS.includes(key as Position)) {
      return key;
    }
  }

  // default topCenter
  return POSITIONS[0];
}

function findTooltip(el: HTMLElement) {
  // @ts-ignore not yet implemented in ts
  const anchorName = el.style.anchorName;

  return document.querySelector(`[style*="position-anchor: ${anchorName}"]`);
}

const vTooltip: Directive<any, any, Position> = {
  mounted(el, binding) {
    const id = Math.random().toString(36).substring(2, 15);
    const anchorName = `--anchor-${id}`;
    el.style.anchorName = anchorName;

    const tooltip = document.createElement("div");
    tooltip.innerText = binding.value;

    // HINT IS EXPERIMENTAL
    tooltip.popover = "hint";
    tooltip.classList.add("tooltip");
    tooltip.classList.add(findFirstValidPosition(binding.modifiers));

    // @ts-ignore not yet implemented in ts
    tooltip.style.positionAnchor = anchorName;

    el.after(tooltip);

    el.addEventListener("mouseenter", () => {
      tooltip.showPopover();
    });

    el.addEventListener("mouseleave", () => {
      tooltip.hidePopover();
    });
  },
  updated(el, binding) {
    const tooltip = findTooltip(el);

    if (tooltip) {
      tooltip.textContent = binding.value;
    }
  },
  unmounted(el) {
    const tooltip = findTooltip(el);

    if (tooltip) {
      tooltip.remove();
    }
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", vTooltip);
});
