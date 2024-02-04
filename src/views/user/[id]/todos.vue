<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/User";
import * as TablerIcons from "@tabler/icons-vue";

const icons = TablerIcons;
const route = useRoute();
const userId = ref(route.params.id);
const userStore = useUserStore();
const todos = ref([]);

const syncLocalTodoStatus = () => {
  todos.value.forEach((todo) => {
    const storedTodoStatus = JSON.parse(
      localStorage.getItem(`user_${userId.value}_todo_status`) || "{}"
    );
    if (storedTodoStatus[todo.id] !== undefined) {
      todo.completed = storedTodoStatus[todo.id];
    }
  });
};

onMounted(() => {
  todos.value = userStore.getTodos();
  syncLocalTodoStatus();
});

watch(
  [() => userStore.getTodos(), () => todos.value],
  ([newUserTodos, newTodos]) => {
    todos.value = newUserTodos;
    syncLocalTodoStatus();
  }
);

const updateTodoStatus = (todo) => {
  const storedTodoStatus = JSON.parse(
    localStorage.getItem(`user_${userId.value}_todo_status`) || "{}"
  );
  storedTodoStatus[todo.id] = todo.completed;
  localStorage.setItem(
    `user_${userId.value}_todo_status`,
    JSON.stringify(storedTodoStatus)
  );
};
</script>

<template>
  <div class="space-y-10">
    <div class="flex flex-row space-x-5 text-xl font-semibold text-blackgray">
      <router-link to="/">
        <icons.IconSquareRoundedArrowLeft :size="24" stroke-width="2" />
      </router-link>

      <h1>Go Home</h1>
    </div>
    <div class="md:p-5" v-if="todos.length > 0">
      <ul class="space-y-6">
        <li
          class="flex flex-row space-x-5"
          v-for="todo in todos"
          :key="todo.id"
        >
          <div class="checkbox-wrapper-13 space-x-4 flex-row flex">
            <input
              id="c1-13 min-w-8 min-h-8"
              type="checkbox"
              v-model="todo.completed"
              class=""
              @change="updateTodoStatus(todo)"
            />
            <label for="cl-13" class="text-sm text-gray2">
              {{ todo.title }}
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  .checkbox-wrapper-13 input[type="checkbox"] {
    --active: #4f359b;
    --active-inner: #fff;
    --focus: 2px #4f359b;
    --border: #49454f;
    --border-hover: #4f359b;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:after {
    content: "";
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
      opacity var(--d-o, 0.2s);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:checked {
    --b: var(--active);
    --bc: var(--active);
    --d-o: 0.3s;
    --d-t: 0.6s;
    --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:disabled {
    --b: var(--disabled);
    cursor: not-allowed;
    opacity: 0.9;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:disabled:checked {
    --b: var(--disabled-inner);
    --bc: var(--border);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:disabled + label {
    cursor: not-allowed;
  }
  .checkbox-wrapper-13
    input[type="checkbox"]:hover:not(:checked):not(:disabled) {
    --bc: var(--border-hover);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:focus {
    box-shadow: 0 0 0 var(--focus);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch) {
    min-width: 21px;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):after {
    opacity: var(--o, 0);
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):checked {
    --o: 1;
  }
  .checkbox-wrapper-13 input[type="checkbox"] + label {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 4px;
  }

  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch) {
    border-radius: 3px;
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):after {
    width: 5px;
    height: 9px;
    border: 2px solid var(--active-inner);
    border-top: 0;
    border-left: 0;
    left: 7px;
    top: 4px;
    transform: rotate(var(--r, 20deg));
  }
  .checkbox-wrapper-13 input[type="checkbox"]:not(.switch):checked {
    --r: 43deg;
  }
}

.checkbox-wrapper-13 * {
  box-sizing: inherit;
}
.checkbox-wrapper-13 *:before,
.checkbox-wrapper-13 *:after {
  box-sizing: inherit;
}
</style>
