<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/User";
import * as TablerIcons from "@tabler/icons-vue";
import Modal from "@/components/Modal.vue";

const icons = TablerIcons;
const userStore = useUserStore();
const posts = ref([]);
const selectedPost = ref(null);
const currentUserId = ref(null);
const currentUser = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  await userStore.fetchUsers();

  const userId = userStore.getUsers()[0]?.id;
  await userStore.fetchUserPosts(userId);

  posts.value = await userStore.getPosts();
  currentUserId.value = userId;
  currentUser.value = userStore.getUserById(currentUserId.value);
  isLoading.value = false;
});

const openModal = (post) => {
  selectedPost.value = post;
};

const closeModal = () => {
  selectedPost.value = null;
};
</script>

<template>
  <div class="flex flex-col  min-h-screen">
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
    </div>
    <div v-else class="space-y-10">
      <div class="flex flex-row space-x-5 text-xl font-semibold text-blackgray">
        <router-link to="/">
          <icons.IconSquareRoundedArrowLeft :size="24" stroke-width="2" />
        </router-link>
        <h1>Go Home</h1>
      </div>

      <ul class="p-3 space-y-7">
        <li
          class="flex flex-col space-y-3"
          v-for="(post, index) in posts"
          :key="post.id"
        >
          <span class="text-xl px-6 font-medium text-blackgray">
            {{ post.title }}
          </span>
          <span class="text-sm px-6 pb-14 lg:w-2/4 text-[#797979]">
            {{ post.body }}
          </span>
          <button
            @click="openModal(post)"
            class="flex w-full items-center flex-row space-x-5 font-medium text-sm text-blackgray justify-end"
          >
            <span>See More</span>
            <icons.IconSquareRoundedArrowRight
              :size="24"
              stroke-width="2"
              class="text-purple"
            />
          </button>
          <div
            v-if="index !== posts.length - 1"
            class="border-t border-graylight my-3"
          ></div>
        </li>
      </ul>
    </div>
    <Modal :post="selectedPost" :user="currentUser" @closeModal="closeModal" />
  </div>
</template>

<style >

</style>
