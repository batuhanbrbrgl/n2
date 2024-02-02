<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
  <div class="relative duration-300 flex min-h-screen">
    <div
      class="text-cyan-100  justify-between flex flex-col border-r border-graylight py-5 w-16 sm:w-48 space-y-6 bg-bar inset-y-0 left-0 transform -translate-x-0 transition duration-200 ease-in-out relative sm:translate-x-0"
    >
      <nav>
        <a
          href="/"
          class="group relative flex gap-3 hover:bg-white sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <div
            class="transition-all absolute left-0 h-full w-2 bg-transparent rounded-r-xl group-hover:bg-purple duration-200"
          ></div>
          <Icon class="w-6 text-purple h-6" icon="ion:logo-xbox" />
          <span class="sm:block hidden text-purple">Dashboard</span>
        </a>

        <a
          href="/"
          class="group relative flex gap-3 hover:bg-white sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <div
            class="transition-all absolute left-0 h-full w-2 bg-transparent rounded-r-lg group-hover:bg-purple duration-200"
          ></div>
          <Icon class="w-6 text-purple h-6" icon="ion:logo-xbox" />
          <span class="sm:block hidden text-purple">Dashboard</span>
        </a>
        <a
          href="/"
          class="group relative flex gap-3 hover:bg-white sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <div
            class="transition-all absolute left-0 h-full w-2 bg-transparent rounded-r-lg group-hover:bg-purple duration-200"
          ></div>
          <Icon class="w-6 text-purple h-6" icon="ion:logo-xbox" />
          <span class="sm:block hidden text-purple">Dashboard</span>
        </a>
        <a
          href="/"
          class="group relative flex gap-3 hover:bg-white sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <div
            class="transition-all absolute left-0 h-full w-2 bg-transparent rounded-r-lg group-hover:bg-purple duration-200"
          ></div>
          <Icon class="w-6 text-purple h-6" icon="ion:logo-xbox" />
          <span class="sm:block hidden text-purple">Dashboard</span>
        </a>
        <a
          href="/"
          class="group relative flex gap-3 hover:bg-white sm:px-5 duration-200 justify-center sm:justify-normal items-center py-3"
        >
          <div
            class="transition-all absolute left-0 h-full w-2 bg-transparent rounded-r-lg group-hover:bg-purple duration-200"
          ></div>
          <Icon class="w-6 text-purple h-6" icon="ion:logo-xbox" />
          <span class="sm:block hidden text-purple">Dashboard</span>
        </a>
      </nav>
      <a href="" class="flex items-center justify-center flex-col gap-2 px-1">
        <div class="w-full  h-[2px] bg-graylight mb-10" ></div>
        <div class="flex text-center items-center space-x-2">
            <img src="/src/assets/logo.png" alt="" />
            <span class="sm:block hidden text-gray2">N2Mobil</span>
        </div>
      
      </a>
    </div>

    <div class="flex-1">
      
      <div class="p-8 text-cyan-800">Content</div>
    </div>
  </div>
</template>
<style scoped></style>
