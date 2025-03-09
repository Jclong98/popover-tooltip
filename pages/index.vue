<script lang="ts" setup>
const counter = ref(0);

onMounted(() => {
  setInterval(() => {
    counter.value++;
  }, 500);
});

const showFirstButton = ref(true);
</script>

<template>
  <pre>{{ { counter } }}</pre>

  <label>
    <input type="checkbox" v-model="showFirstButton" />
    Show first button
  </label>

  <div class="grid-container">
    <button
      v-if="showFirstButton"
      v-tooltip.topRight="'this is the tooltip content ' + counter"
    >
      topRight
    </button>
    <button v-tooltip.topCenter="'topCenter'">topCenter</button>
    <button v-tooltip.topLeft="'this is the tooltip content'">topLeft</button>

    <button v-tooltip.left="'this is the tooltip content'">left</button>
    <div></div>
    <button v-tooltip.right="'this is the tooltip content'">right</button>

    <button v-tooltip.bottomRight="'this is the tooltip content'">
      bottomRight
    </button>
    <button v-tooltip.bottomCenter="'bottomCenter'">bottomCenter</button>
    <button v-tooltip.bottomLeft="'this is the tooltip content'">
      bottomLeft
    </button>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 50px;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 200px;
}
</style>
