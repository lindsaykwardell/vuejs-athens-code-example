<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
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
