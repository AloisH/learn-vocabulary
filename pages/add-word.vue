<template>
    <div class="py-8 flex flex-col gap-4 items-center h-screen">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Add new Vocabulary</h1>
        <Drawer>
            <DrawerTrigger as-child>
                <Button class="h-32 text-lg w-full">+ Word Family</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        Add a family
                    </DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    </div>
</template>


<script setup lang="ts">
type WordFamily = { id: number; family: string; }
const { data } = await useFetch<{ data: WordFamily[] }>('/api/family');
console.log(data.value);

</script>