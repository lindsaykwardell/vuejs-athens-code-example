<script setup lang="ts">
defineProps({
  remainingCount: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
});

defineEmits(["clearCompletedTodos"]);
</script>

<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ remainingCount }}</strong>
      {{ remainingCount === 1 ? "item" : "items" }} left
    </span>
    <ul class="filters">
      <li>
        <a href="#/">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    <button
      v-if="remainingCount !== totalCount"
      class="clear-completed"
      @click="$emit('clearCompletedTodos')"
    >
      Clear completed
    </button>
  </footer>
</template>
