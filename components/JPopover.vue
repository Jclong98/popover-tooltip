<script lang="ts" setup>
import type { Position } from "~/plugins/tooltip";

const props = defineProps<{
  position: Position;
}>();

const isOpen = defineModel("isOpen", { default: false });

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);
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
      anchorName,
      props: {
        'aria-describedby': id,
        'aria-expanded': isOpen,
        'aria-haspopup': true,
        'aria-controls': id,
        onClick: () => toggle(),
        style: { anchorName },
      },
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
      'position-anchor': anchorName,
    }"
    @toggle="isOpen = $event.newState == 'open'"
  >
    <slot></slot>
  </div>
</template>
