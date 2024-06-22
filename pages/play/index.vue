<template>
    <div class="h-screen">
        <NuxtLink class="w-full" to="/">
            <Button class="w-full">Back</Button>
        </NuxtLink>
        <div class="py-8 flex flex-col gap-4 items-center h-full">
            <h1
                class="flex justify-center items-center gap-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                <span>
                    Play
                </span>
                <Button variant="secondary">Select game mode</Button>
            </h1>
            <NuxtLink class="w-full" v-for="family in familys"
                :to='{ name: "play-game-id", params: { id: family.id, game: "normal" } }'>
                <Button class="h-32 text-lg w-full">
                    {{ family.family }}
                </Button>
            </NuxtLink>
            <NuxtLink class="w-full" :to='{ name: "play-game-id", params: { id: 0, game: "normal" } }'>
                <Button class="h-32 text-lg w-full">All Family</Button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const { data: familys, refresh: refreshFamily } = await useFetch('/api/family');
</script>
