<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  emits: ["addTodo"],
  setup(props, { emit }) {
    const newTodo = ref("");

    function addTodo() {
      if (newTodo.value) {
        emit("addTodo", newTodo.value);
        newTodo.value = "";
      }
    }

    return {
      newTodo,
      addTodo,
    };
  },
});
</script>

<template>
  <header class="header">
    <h1>todos</h1>
    <input
      v-model="newTodo"
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      @keyup.enter="addTodo"
    />
  </header>
</template>
