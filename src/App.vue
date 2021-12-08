<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import type { Todo } from "./types/Todo";

import Header from "./components/Header.vue";
import TodoCard from "./components/TodoCard.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  setup() {
    const todos = ref<Todo[]>([]);
    const route = useRoute();

    const visibleTodos = computed(() => {
      switch (route.name) {
        case "home":
          return todos.value;
        case "active":
          return todos.value.filter((todo) => !todo.completed);
        case "completed":
          return todos.value.filter((todo) => todo.completed);
      }
    });

    const remainingCount = computed(
      () => todos.value.filter((todo) => !todo.completed).length
    );
    const totalCount = computed(() => todos.value.length);

    function addTodo(todo: string) {
      todos.value.push({
        id: todos.value.length,
        title: todo,
        completed: false,
      });
    }

    function updateTodo(updatedTodo: Todo) {
      todos.value = todos.value.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      );
    }

    function deleteTodo(id: number) {
      todos.value = todos.value.filter((todo) => todo.id !== id);
    }

    function toggleAll() {
      todos.value = todos.value.map((todo) => ({
        ...todo,
        completed: remainingCount.value !== 0,
      }));
    }

    function clearCompleted() {
      todos.value = todos.value.filter((todo) => !todo.completed);
    }

    return {
      visibleTodos,
      remainingCount,
      totalCount,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleAll,
      clearCompleted,
    };
  },
  components: {
    Header,
    TodoCard,
    Footer,
  },
});
</script>

<template>
  <section class="todoapp">
    <Header @addTodo="addTodo" />
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        @click="toggleAll"
      />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <TodoCard
          v-for="todo in visibleTodos"
          :key="todo.id"
          v-bind="todo"
          @updateTodo="updateTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <Footer
      v-if="totalCount"
      :remainingCount="remainingCount"
      :totalCount="totalCount"
      @clearCompletedTodos="clearCompleted"
    />
  </section>
</template>
