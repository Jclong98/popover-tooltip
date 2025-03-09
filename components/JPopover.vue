<script lang="ts" setup>
import type { Position } from "~/plugins/tooltip";

const props = defineProps<{
  position: Position;
}>();

const isOpen = defineModel("isOpen", { default: false });

const id = useId();
const positionAnchor = computed(() => `--anchor-${id}`);
const popover = useTemplateRef("popover");

function open() {
  popover.value?.showPopover();
}

function close() {
  popover.value?.hidePopover();
}

function toggle(v?: boolean) {
  isOpen.value = v ?? !isOpen.value;
}

onMounted(() => {
  watch(isOpen, (nv) => (nv ? open() : close()), { immediate: true });
});
</script>

<template>
  <slot
    name="activator"
    v-bind="{
      toggle,
      isOpen,
      id,
      positionAnchor,
    }"
  ></slot>

  <div
    :id
    v-bind="$attrs"
    ref="popover"
    popover
    class="tooltip popover"
    :class="[props.position]"
    :style="{
      // @ts-expect-error anchor-name not yet implemented
      'position-anchor': positionAnchor,
    }"
    @toggle="isOpen = $event.newState == 'open'"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
:where(.popover) {
  margin: 0;
  inset: unset;
}
</style>
