<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["addTodo"]);

const newTodo = ref("");

function addTodo() {
  if (newTodo.value) {
    emit("addTodo", newTodo.value);
    newTodo.value = "";
  }
}
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
