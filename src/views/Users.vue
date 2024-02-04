<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/User";
import * as TablerIcons from "@tabler/icons-vue";

const icons = TablerIcons;
const userStore = useUserStore();

const users = ref([]);

onMounted(async () => {
  await userStore.fetchUsers();
  users.value = userStore.getUsers();
});
</script>

<template>
  <div class="">
    <h1 class="font-semibold text-xl text-blackgray py-6">All Users</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <router-link
        :to="{ name: 'user-todos', params: { id: user.id } }"
        v-for="user in users"
        :key="user.id"
        class="border border-graylight hover:shadow-2xl duration-300 rounded-xl p-6 space-y-4 flex flex-col"
      >
        <div class="flex flex-col lg:flex-row lg:space-x-4">
          <div class="overflow-hidden rounded-full mb-2">
            <img
              class="object-cover w-24 rounded-full h-24"
              :src="user.image"
              alt=""
            />
          </div>
          <div class="flex flex-col justify-center">
            <p class="font-medium text-lg text-blackgray">{{ user.name }}</p>
            <p
              class="text-gray text-[15px] xl:text-sm font-normal overflow-hidden"
            >
              {{ user.email }}
            </p>
            <p class="text-gray text-[15px] xl:text-sm font-normal">
              {{ user.phone }}
            </p>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <div class="flex flex-col space-y-1">
            <div class="flex flex-row space-x-2">
              <icons.IconMapPinHeart
                class="text-blackgray"
                :size="18"
                stroke-width="2"
              />
              <span class="font-medium text-sm">Location</span>
            </div>
            <div class="text-gray font-light flex flex-col text-sm">
              <div>{{ user.address.street }}, {{ user.address.suite }}</div>
              <div class="">
                {{ user.address.city }}, {{ user.address.zipcode }}
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex flex-row space-x-2">
              <icons.IconBuildingSkyscraper
                class="text-blackgray"
                :size="18"
                stroke-width="2"
              />
              <span class="font-medium text-sm">Company</span>
            </div>
            <div class="text-gray font-light flex flex-col text-sm">
              {{ user.company.name }}
            </div>
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex flex-row space-x-2">
              <icons.IconWorldShare
                class="text-blackgray"
                :size="18"
                stroke-width="2"
              />
              <span class="font-medium text-sm">Website</span>
            </div>
            <div class="text-gray font-light flex flex-col text-sm">
              {{ user.website }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style></style>
