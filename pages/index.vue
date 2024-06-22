<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="py-16 flex flex-col gap-12 items-center justify-between h-screen">
    <div class="flex gap-4 flex-col">
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Learn Vocabulary</h1>
      <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">By
        Alois Heloir</h2>
    </div>

    <div class="flex flex-col w-full gap-4">
      <NuxtLink to="/play" class="w-full">
        <Button class="h-32 text-lg w-full">Play</Button>
      </NuxtLink>

      <NuxtLink to="/add-word" class="w-full">
        <Button class="h-32 text-lg w-full">Add word</Button>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
@import url("~/assets/css/tailwind.css");
</style>