import { Todo } from "@/types/Todo";

export default function syncTodo(todo: Todo): Promise<Todo> {
  return timeout(1000).then(() => {
    return todo;
  });
}

// async function that times out for n seconds and returns a promise
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
