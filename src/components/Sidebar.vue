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
    <div
      class="text-cyan-100 flex flex-col border-r border-graylight py-3 w-16 sm:w-60 space-y-6 bg-bar left-0 transition duration-200 ease-in-out relative sm:static sm:translate-x-0"
      style="position: sticky; top: 0; height: 100vh; overflow-y: auto"
    >
      <div class="flex font-bold justify-center flex-col gap-2 px-1">
        <div v-if="currentUser !== null">
          <div class="flex flex-row items-center space-x-2">
            <div
              class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12"
            >
              <img
                :src="currentUser.image"
                class="rounded-full w-full h-full object-cover"
                alt=""
              />
            </div>
            <div class="flex flex-col">
              <span class="sm:block hidden text-lg font-medium text-gray2">{{
                currentUser.name
              }}</span>
              <span class="sm:block hidden text-sm font-light text-gray2">{{
                currentUser.email
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <nav class="space-y-4">
        <router-link
          v-if="currentUserId === null"
          to="/"
          class="relative flex gap-3 bg-white sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <icons.IconUsers class="text-purple" :size="18" stroke-width="2" />
          <div
            class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"
          ></div>
          <span class="sm:block hidden text-purple">Users</span>
        </router-link>

        <router-link
          v-if="currentUserId !== null"
          :to="{ name: 'user-todos', params: { id: currentUserId } }"
          :class="{ 'bg-white': $route.name === 'user-todos' }"
          class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <icons.IconCheckupList
            class="text-purple"
            :size="18"
            stroke-width="2"
          />
          <div
            v-if="$route.name === 'user-todos'"
            class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"
          ></div>
          <span
            class="sm:block hidden text-[#959595]"
            :class="{ '!text-purple': $route.name === 'user-todos' }"
            >Todos</span
          >
        </router-link>

        <router-link
          v-if="currentUserId !== null"
          :to="{ name: 'user-posts', params: { id: currentUserId } }"
          :class="{ 'bg-white': $route.name === 'user-posts' }"
          class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <icons.IconNotebook class="text-purple" :size="18" stroke-width="2" />
          <div
            v-if="$route.name === 'user-posts'"
            class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"
          ></div>
          <span
            :class="{ '!text-purple': $route.name === 'user-posts' }"
            class="sm:block hidden text-[#959595]"
            >Posts</span
          >
        </router-link>

        <router-link
          v-if="currentUserId !== null"
          :to="{ name: 'user-albums', params: { id: currentUserId } }"
          :class="{
            'bg-white':
              $route.name === 'user-albums' ||
              $route.name === 'user-album-photos',
          }"
          class="relative flex gap-3 sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <icons.IconPhotoHeart
            class="text-purple"
            :size="18"
            stroke-width="2"
          />
          <div
            v-if="
              $route.name === 'user-albums' ||
              $route.name === 'user-album-photos'
            "
            class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"
          ></div>
          <span
            class="sm:block hidden text-[#959595]"
            :class="{
              '!text-purple':
                $route.name === 'user-albums' ||
                $route.name === 'user-album-photos',
            }"
            >Albums</span
          >
        </router-link>
      </nav>
      <a
        href=""
        class="flex items-center w-full font-bold justify-center flex-col gap-2 px-2 lg:px-8 absolute bottom-8 lg:left-1/2 lg:transform lg:-translate-x-1/2"
      >
        <div class="w-full h-[2px] bg-graylight mb-6"></div>

        <div class="flex text-center items-center space-x-2">
          <img class="" src="/img/logo.png" alt="" />
          <span class="sm:block hidden text-gray2">N2Mobil</span>
        </div>
      </a>
    </div>

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
