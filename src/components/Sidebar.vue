<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useUserStore } from "@/stores/User";
import { useRoute } from "vue-router";
import * as TablerIcons from "@tabler/icons-vue";

const icons = TablerIcons;

const route = useRoute();
const userStore = useUserStore();
const currentUserId = ref(null);
const currentUser = ref(null);

onMounted(() => {
  watchEffect(() => {
    if (route.path === "/") {
      currentUserId.value = null;
      currentUser.value = null;
    } else {
      currentUserId.value = route.params.id;
      userStore.fetchUsers().then(() => {
        currentUser.value = userStore.getUserById(Number(currentUserId.value));
      });
    }
  });
});
</script>

<template>
  <div class="relative poppins duration-300 flex min-h-screen">
    <!-- Sidebar -->
    <div class="text-cyan-100 flex flex-col border-r border-graylight py-3 w-16 sm:w-60 space-y-6 bg-bar left-0 transition duration-200 ease-in-out relative sm:static sm:translate-x-0" style="position: sticky; top: 0; height: 100vh; overflow-y: auto">
      <!-- User info -->
      <div v-if="currentUser" class="flex flex-row items-center justify-center space-x-2">
        <div v-if="currentUser.image" class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12">
          <img :src="currentUser.image" class="rounded-full w-full h-full object-cover" alt="" />
        </div>
        <div class="flex flex-col">
          <span v-if="currentUser.name" class="sm:block hidden text-lg font-medium text-gray2">{{ currentUser.name }}</span>
          <span v-if="currentUser.email" class="sm:block hidden text-sm font-light text-gray2">{{ currentUser.email }}</span>
        </div>
      </div>
      
      <!-- Navigation -->
      <nav class="space-y-4">
        <!-- Users link -->
        <router-link
          to="/"
          :class="{ 'bg-white': $route.name === 'Users' }"
          class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <icons.IconUsers class="text-purple" :size="18" stroke-width="2" />
          <div v-if="$route.name === 'Users'" class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"></div>
          <span class="sm:block hidden text-purple">Users</span>
        </router-link>

        <!-- Dashboard link -->
        <router-link
          to="/dashboard"
          :class="{ 'bg-white': $route.name === 'Dashboard' }"
          class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <icons.IconDashboard class="text-purple" :size="18" stroke-width="2" />
          <div v-if="$route.name === 'Dashboard'" class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"></div>
          <span class="sm:block hidden text-purple">Dashboard</span>
        </router-link>

        <!-- Dynamic links based on user -->
        <template v-if="currentUser && currentUser.id">
          <!-- Todos link -->
          <router-link
            :to="{ name: 'user-todos', params: { id: currentUser.id }}"
            :class="{ 'bg-white': $route.name === 'user-todos' }"
            class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
          >
            <icons.IconCheckupList class="text-purple" :size="18" stroke-width="2" />
            <div v-if="$route.name === 'user-todos'" class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"></div>
            <span class="sm:block hidden text-purple">Todos</span>
          </router-link>

          <!-- Posts link -->
          <router-link
            :to="{ name: 'user-posts', params: { id: currentUser.id }}"
            :class="{ 'bg-white': $route.name === 'user-posts' }"
            class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
          >
            <icons.IconNotebook class="text-purple" :size="18" stroke-width="2" />
            <div v-if="$route.name === 'user-posts'" class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"></div>
            <span class="sm:block hidden text-purple">Posts</span>
          </router-link>

          <!-- Albums link -->
          <router-link
            :to="{ name: 'user-albums', params: { id: currentUser.id }}"
            :class="{ 'bg-white': $route.name === 'user-albums' }"
            class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
          >
            <icons.IconPhotoHeart class="text-purple" :size="18" stroke-width="2" />
            <div v-if="$route.name === 'user-albums'" class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"></div>
            <span class="sm:block hidden text-purple">Albums</span>
          </router-link>
        </template>
      </nav>
      
      <!-- Footer -->
      <a href="" class="flex items-center w-full font-bold justify-center flex-col gap-2 px-2 lg:px-8 absolute bottom-8 lg:left-1/2 lg:transform lg:-translate-x-1/2">
        <div class="w-full h-[2px] bg-graylight mb-6"></div>
        <div class="flex text-center items-center space-x-2">
          <img class="" src="/img/logo.png" alt="" />
          <span class="sm:block hidden text-gray2">N2Mobil</span>
        </div>
      </a>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-6">
      <router-view />
    </div>
  </div>
</template>
<style>
.poppins {
  font-family: "Poppins", sans-serif;
}
</style>


<style>
.poppins {
  font-family: "Poppins", sans-serif;
}
</style>
