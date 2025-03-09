import type { Directive } from "vue";

const POSITIONS = [
  "topCenter",
  "topLeft",
  "topRight",
  "bottomCenter",
  "bottomLeft",
  "bottomRight",
  "left",
  "right",
];

function findFirstValidPosition(modifiers: Record<string, boolean>) {
  for (const key of Object.keys(modifiers)) {
    if (POSITIONS.includes(key)) {
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

const vTooltip: Directive = {
  mounted(el, binding) {
    console.log({ el, binding });

    const id = Math.random().toString(36).substring(2, 15);
    const anchorName = `--anchor-${id}`;
    el.style.anchorName = anchorName;

    const tooltip = document.createElement("div");
    tooltip.innerText = binding.value;

    tooltip.classList.add("tooltip");
    tooltip.classList.add(findFirstValidPosition(binding.modifiers));

    // @ts-ignore not yet implemented in ts
    tooltip.style.positionAnchor = anchorName;

    el.after(tooltip);

    el.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
    });

    el.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
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
