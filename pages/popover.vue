<script lang="ts" setup></script>

<template>
  <div class="container">
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
  margin: 200px;
  display: flex;
}
</style>
