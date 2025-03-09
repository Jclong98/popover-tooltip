<script lang="ts" setup>
const container = useTemplateRef("container");
const { style } = useDraggable(container);
</script>

<template>
  <div class="container" ref="container" :style="style" style="position: fixed">
    <JPopover position="topCenter" :is-open="true">
      <template #activator="{ toggle, isOpen, positionAnchor }">
        <!-- @vue-expect-error anchor-name not yet implemented -->
        <button :style="{ 'anchor-name': positionAnchor }" @click="toggle()">
          activate popover | {{ isOpen }}
        </button>
      </template>

      This is the content for the popover
    </JPopover>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
}
</style>
