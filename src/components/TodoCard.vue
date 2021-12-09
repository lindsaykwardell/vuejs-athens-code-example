<script setup lang="ts">
// import { Todo } from "@/types/Todo";
import { ref } from "vue";

/*
As of now, the type declaration argument must be one of the following to 
ensure correct static analysis:

- A type literal
- A reference to an interface or a type literal in the same file

Currently complex types and type imports from other files are not supported. 
It is theoretically possible to support type imports in the future
*/

// const props = defineProps<Todo>(); <- DOES NOT WORK

const props = withDefaults(
  defineProps<{
    id: number;
    title: string;
    completed?: boolean;
  }>(),
  {
    completed: false,
  }
);
const emit = defineEmits(["updateTodo", "deleteTodo"]);

const editedTitle = ref("");

function editTodo() {
  editedTitle.value = props.title;
}

function doneEditing() {
  if (editedTitle.value.trim()) {
    emit("updateTodo", {
      id: props.id,
      title: editedTitle.value,
      completed: props.completed,
    });

    editedTitle.value = "";
  }
}

function toggleCompleted() {
  emit("updateTodo", {
    id: props.id,
    title: props.title,
    completed: !props.completed,
  });
}
</script>

<template>
  <li
    class="todo"
    :class="{ completed: completed, editing: editedTitle !== '' }"
  >
    <div v-if="editedTitle === ''" class="view">
      <input
        :checked="$props.completed"
        class="toggle"
        type="checkbox"
        @click="toggleCompleted"
      />
      <label @dblclick="editTodo">{{ $props.title }}</label>
      <button class="destroy" @click="$emit('deleteTodo', $props.id)"></button>
    </div>
    <input
      v-else
      class="edit"
      type="text"
      v-model="editedTitle"
      @blur="doneEditing"
      @keyup.enter="doneEditing"
      @keyup.esc="editedTitle = ''"
    />
  </li>
</template>
