<script setup>
import { ref, defineProps, defineEmits, onBeforeUnmount } from 'vue';
import * as TablerIcons from "@tabler/icons-vue";

const icons = TablerIcons;
const { post, user } = defineProps(['post', 'user']);
const emits = defineEmits();

const selectedPost = ref(null);

const openModal = (post) => {
 selectedPost.value = post;
};

const closeModal = () => {
 selectedPost.value = null;
 emits('closeModal');
};

onBeforeUnmount(() => {
 selectedPost.value = null;
});
 </script>
<template>
    <div v-if="post" class="modal-overlay bg-gray bg-opacity-50 flex items-center z-50 justify-center fixed top-0 left-0 w-full h-full" @click="closeModal">
      <div class="modal p-0 rounded-lg relative overflow-hidden bg-white w-full m-4 lg:w-3/4" @click.stop> 
        <h2 class="p-8 font-medium text-md lg:text-2xl text-blackgray">
          {{ post.title }}
        </h2>
        <span class="close absolute top-2 right-2 cursor-pointer" @click="closeModal">
          <icons.IconSquareRoundedX :size="24" stroke-width="2" />
        </span>
        <div class="modal-content max-h-[60vh] lg:max-h-full lg:h-[60vh] flex flex-col md:flex-row space-x-3">
          <div class="modal-header-container min-h-40 flex-1 overflow-y-auto px-5 py-0 lg:py-5">
            <div class="modal-header min-h-40 px-5 py-0 lg:py-5 text-sm text-gray">
              <h2>{{ post.body }}</h2>
            </div>
          </div>
          <div class="border border-graylight ml-5"></div>
          <div class="modal-body-container flex-1 overflow-y-auto p-5">
            <h1 class="text-xl font-semibold text-blackgray">Comments</h1>
            <div class="modal-body p-5 space-y-9">
              <div class="flex flex-row space-x-2">
                <div class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12">
                  <img src="/src/assets/img/leyla.png" class="rounded-full w-full h-full object-cover" alt="" />
                </div>
                <div class="flex flex-col">
                  <span class="text-lg font-medium text-gray2">Leyla Selim</span>
                  <span class="text-sm font-light text-gray2">
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
                <div class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12">
                  <img src="/src/assets/img/jane.png" class="rounded-full w-full h-full object-cover" alt="" />
                </div>
                <div class="flex flex-col">
                  <span class="text-lg font-medium text-gray2">{{ user.name }}</span>
                  <span class="text-sm font-light text-gray2">
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
                <div class="rounded-full overflow-hidden min-w-12 min-h-12 w-12 h-12">
                  <img src="/src/assets/img/leyla.png" class="rounded-full w-full h-full object-cover" alt="" />
                </div>
                <div class="flex flex-col">
                  <span class="text-lg font-medium text-gray2">Leyla Selim</span>
                  <span class="text-sm font-light text-gray2">
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
  </style>
  