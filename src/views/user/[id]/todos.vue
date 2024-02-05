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
      <ul class="space-y-10">
        <li
          class="flex flex-row space-x-5"
          v-for="todo in todos"
          :key="todo.id"
        >
          <div class="checkbox-wrapper-13 gap-4 flex-row flex">
            <input
              id="c1-13 min-w-8 min-h-8"
              type="checkbox"
              v-model="todo.completed"
              class=""
              @change="updateTodoStatus(todo)"
            />
            <label for="cl-13" class="text-sm ml-4 text-gray2">
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
@import '/src/assets/todos.css';
</style>
