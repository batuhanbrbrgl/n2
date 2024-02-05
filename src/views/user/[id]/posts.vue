<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/User";
import * as TablerIcons from "@tabler/icons-vue";

const icons = TablerIcons;
const userStore = useUserStore();
const posts = ref([]);
const selectedPost = ref(null);
const currentUserId = ref(null);
const currentUser = ref(null);

onBeforeMount(async () => {
  await userStore.fetchUsers();

  const userId = userStore.getUsers()[0]?.id;
  await userStore.fetchUserPosts(userId);

  posts.value = await userStore.getPosts();
  currentUserId.value = userId;
  currentUser.value = userStore.getUserById(currentUserId.value);
});

const openModal = (post) => {
  selectedPost.value = post;
};

const closeModal = () => {
  selectedPost.value = null;
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
  <div v-if="selectedPost" class="modal-overlay bg-gray bg-opacity-50 flex items-center z-50 justify-center fixed top-0 left-0 w-full h-full" @click="closeModal">
    <div class="modal w-full m-4 lg:w-3/4" @click.stop>
      <h2 class="p-8 font-medium text-md lg:text-2xl text-blackgray">
        {{ selectedPost.title }}
      </h2>
      <span class="close" @click="closeModal"
        ><icons.IconSquareRoundedX :size="24" stroke-width="2"
      /></span>
      <div class="modal-content max-h-[60vh] lg:max-h-full lg:h-[60vh] flex flex-col md:flex-row space-x-3">
        <div class="modal-header-container min-h-40 flex-1 overflow-y-auto px-5 py-0 lg:py-5">
          <div class="modal-header min-h-40 px-5 py-0 lg:py-5 text-sm text-gray">
            <h2>{{ selectedPost.body }}
              
            </h2>
          </div>
        </div>
        <div class="border border-graylight ml-5"></div>
        <div class="modal-body-container flex-1 overflow-y-auto p-5">
          <h1 class="text-xl font-semibold text-blackgray">Commnents</h1>
          <div class="modal-body p-5 space-y-9">
            <div class="flex flex-row space-x-2">
              <div
                class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12"
              >
                <img
                  src="/src/assets/img/leyla.png"
                  class="rounded-full w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div class="flex flex-col">
                <span class=" text-lg font-medium text-gray2">
                  Leyla Selim
                </span>
                <span class=" text-sm font-light text-gray2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  fuga non soluta eaque inventore natus delectus iste tempore
                  in. Quidem minima tempore accusamus quisquam, vero
                  consequuntur deleniti maiores omnis quos repellendus pariatur
                  ab eveniet corrupti a tempora nihil eos rerum iste? Mollitia,
                  accusamus perspiciatis quidem nam voluptatibus laboriosam
                  saepe necessitatibus!
                </span>
              </div>
            </div>
            <div class="flex flex-row space-x-2">
              <div
                class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12"
              >
                <img
                  src="/src/assets/img/jane.png"
                  class="rounded-full w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div class="flex flex-col">
                <span class=" text-lg font-medium text-gray2">
                  {{ currentUser.name }}
                </span>
                <span class=" text-sm font-light text-gray2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  fuga non soluta eaque inventore natus delectus iste tempore
                  in. Quidem minima tempore accusamus quisquam, vero
                  consequuntur deleniti maiores omnis quos repellendus pariatur
                  ab eveniet corrupti a tempora nihil eos rerum iste? Mollitia,
                  accusamus perspiciatis quidem nam voluptatibus laboriosam
                  saepe necessitatibus!
                </span>
              </div>
            </div>
            <div class="flex flex-row space-x-2">
              <div
                class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12"
              >
                <img
                  src="/src/assets/img/leyla.png"
                  class="rounded-full w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div class="flex flex-col">
                <span class=" text-lg font-medium text-gray2">
                  Leyla Selim
                </span>
                <span class=" text-sm font-light text-gray2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  fuga non soluta eaque inventore natus delectus iste tempore
                  in. Quidem minima tempore accusamus quisquam, vero
                  consequuntur deleniti maiores omnis quos repellendus pariatur
                  ab eveniet corrupti a tempora nihil eos rerum iste? Mollitia,
                  accusamus perspiciatis quidem nam voluptatibus laboriosam
                  saepe necessitatibus!
                </span>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>



.modal {
  background: white;
  padding: 0; 
  border-radius: 8px;

  position: relative;
  overflow: hidden; 
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
