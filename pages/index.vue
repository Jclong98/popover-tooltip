<script lang="ts" setup></script>

<template>
  <div class="grid-container">
    <div class="filler"></div>
    <div class="filler"></div>
    <div class="filler"></div>

    <div class="filler"></div>
    <div>
      <button class="anchor">topCenter</button>
    </div>
    <div class="filler"></div>

    <div class="filler"></div>
    <div class="filler"></div>
    <div class="filler"></div>
  </div>

  <div class="tooltip topCenter">This is the tooltip content</div>
</template>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
}

.filler {
  height: 300px;
  border: 1px solid #ccc;
  width: 300px;
}

.anchor {
  anchor-name: --anchor;
}

.tooltip {
  --gap: 8px;

  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;

  /* position styling */
  position: fixed;
  position-anchor: --anchor;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;

  &.topCenter {
    justify-self: anchor-center;
    bottom: anchor(top);
    margin-block-end: var(--gap);
  }

  &.topLeft {
    bottom: anchor(top);
    left: anchor(left);
    margin-block-end: var(--gap);
  }

  &.topRight {
    bottom: anchor(top);
    right: anchor(right);
    margin-block-end: var(--gap);
  }

  &.bottomCenter {
    justify-self: anchor-center;
    top: anchor(bottom);
    margin-block-start: var(--gap);
  }

  &.bottomLeft {
    top: anchor(bottom);
    left: anchor(left);
    margin-block-start: var(--gap);
  }

  &.bottomRight {
    top: anchor(bottom);
    right: anchor(right);
    margin-block-start: var(--gap);
  }

  &.left {
    align-self: anchor-center;
    right: anchor(left);
    margin-inline-end: var(--gap);
  }

  &.right {
    align-self: anchor-center;
    left: anchor(right);
    margin-inline-start: var(--gap);
  }
}
</style>
