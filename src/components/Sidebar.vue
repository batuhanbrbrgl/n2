<script setup>
import { IconUsers } from '@tabler/icons-vue';
import Sidebar from './Sidebar.vue';
</script>
<template>
  <div class="relative poppins duration-300 flex min-h-screen">
    <div
      class="text-cyan-100  justify-between flex flex-col border-r border-graylight py-9 w-16 sm:w-48 space-y-6 bg-bar inset-y-0 left-0 transform -translate-x-0 transition duration-200 ease-in-out relative sm:translate-x-0"
    >
      <nav>
        <a
          href="/"
          class=" relative flex gap-3 bg-white sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <div
            class="transition-all absolute left-0 h-full w-2 rounded-r-xl bg-purple duration-200"
          ></div>
          <IconUsers class="text-purple" :size="18" stroke-width="1" />

          <span class="sm:block hidden text-purple">Users</span>
        </a>

      
      </nav>
      <a href="" class="flex items-center font-bold justify-center flex-col gap-2 px-1">
        <div class="w-full  h-[2px] bg-graylight mb-6" ></div>
        <div class="flex text-center items-center space-x-2">
            <img src="/src/assets/logo.png" alt="" />
            <span class="sm:block hidden text-gray2">N2Mobil</span>
        </div>
      
      </a>
    </div>

    <div class="flex-1">
      
      
       <router-view />
        
      
    </div>
  </div>
</template>
<style >
.poppins {
  font-family: "Poppins", sans-serif;
}
</style>
