<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 2xl:px-6 lg:grid-cols-5 xl:grid-cols-7 gap-3 place-items-center">
      <img v-for="photo in albumPhotos[0]" :key="photo.id" :src="photo.url" :alt="photo.title" class="w-52 h-52" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/User";
import * as TablerIcons from "@tabler/icons-vue";

const icons = TablerIcons;
const userStore = useUserStore();
const albumPhotos = ref([]);

onBeforeMount(async () => {
  await userStore.fetchUsers();

  const selectedUserId = userStore.getUsers()[0]?.id;

  await userStore.fetchUserAlbums(selectedUserId);
  const albums = await userStore.getAlbums();
  console.log('batuhanndssdsddssdsd:', albums);

  albumPhotos.value = await Promise.all(albums.map(async (album) => {
    await userStore.fetchAlbumPhotos(selectedUserId, album.id);
    return userStore.getPhotos().slice();
  }));
  console.log('ahmet', albumPhotos.value);
});
</script>

<style scoped>
</style>
