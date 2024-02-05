<template>
  <div class="flex flex-col min-h-screen">
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
    </div>
  <div class="space-y-10">
    <div class="flex flex-row space-x-5 text-xl font-semibold text-blackgray">
      <router-link to="/">
        <icons.IconSquareRoundedArrowLeft :size="24" stroke-width="2" />
      </router-link>
      <h1>Go Home</h1>
    </div>
    <div class="grid grid-cols-1 2xl:px-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 place-items-center">
      <router-link
        v-for="album in albums"
        :key="album.id"
        :to="{ name: 'user-album-photos', params: { userId: userStore.getUsers()[0]?.id, albumId: album.id } }"
        class="max-w-fit "
      >
        <div class="p-3 lg:p-7  md:h-[350px] rounded-xl hover:shadow-2xl border border-graylight hover:shadow-black duration-500 space-y-3">
          <div class="items-center grid grid-cols-2 gap-4">
            <img class="w-24 md:w-full max-w-full max-h-full" src="/src/assets/albums/photo1.png" alt="" />
            <img class="w-24 md:w-full max-w-full max-h-full" src="/src/assets/albums/photo2.png" alt="" />
            <img class="w-24 md:w-full max-w-full max-h-full" src="/src/assets/albums/photo3.png" alt="" />
            <img class="w-24 md:w-full max-w-full max-h-full" src="/src/assets/albums/photo4.png" alt="" />
          </div>
          <div class="flex w-64 ">
            <span class="text-sm font-medium text-blackgray">{{ album.title }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/User';
import * as TablerIcons from '@tabler/icons-vue';

const icons = TablerIcons;
const userStore = useUserStore();
const albums = ref([]);
const isLoading = ref(true);

onBeforeMount(async () => {
  await userStore.fetchUsers();

  const userId = userStore.getUsers()[0]?.id;
  await userStore.fetchUserAlbums(userId);

  albums.value = await userStore.getAlbums();
  isLoading.value = false;

});
</script>

<style scoped>
</style>
