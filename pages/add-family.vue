<template>
    <div class="py-8 flex flex-col gap-4 items-center">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Add new Vocabulary</h1>
        <Drawer v-for="family in familys">
            <DrawerTrigger as-child>
                <Button class="h-32 text-lg w-full">{{ family.family }}</Button>
            </DrawerTrigger>
            <DrawerContent class="pb-32 px-4">
                <div class="flex justify-between">
                    <div>
                        <DrawerTitle>{{ family.family }}</DrawerTitle>
                        <DrawerDescription>Add new word or modify the family</DrawerDescription>
                    </div>
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger as-child>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogTitle>Are you sure you want to delete {{ family.family }} ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your family
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction :onclick="async () => onDeleteFamily(family.id)">Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
        <Drawer>
            <DrawerTrigger as-child>
                <Button class="h-32 text-lg w-full">+ New word family</Button>
            </DrawerTrigger>
            <DrawerContent class="pb-32 px-4">
                <DrawerHeader>
                    <DrawerTitle>
                        Add a family
                    </DrawerTitle>
                </DrawerHeader>
                <form @submit="onSubmitFamily">
                    <FormField v-slot="{ componentField }" name="family">
                        <FormItem>
                            <FormLabel>Family name</FormLabel>
                            <FormControl>
                                <Input placeholder="family" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>
                    <div class="mt-8 flex justify-end gap-4">
                        <DrawerClose as-child>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DrawerClose>
                        <DrawerClose as-child>
                            <Button type="submit">
                                Add
                            </Button>
                        </DrawerClose>
                    </div>
                </Form>
            </DrawerContent>
        </Drawer>
    </div>
</template>


<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from "zod";

const { data: familys, refresh: refreshFamily } = await useFetch('/api/family');

const formSchema = toTypedSchema(z.object({
    family: z.string().min(2),
}));

const form = useForm({
    validationSchema: formSchema
});

const onSubmitFamily = form.handleSubmit(async (values) => {
    const result = await useFetch('/api/family', {
        method: "POST",
        body: values,
    })
    if (result.data.value?.success) {
        await refreshFamily();
    }
});

const onDeleteFamily = async (id: number) => {
    const result = await useFetch(`/api/familly/${id}`, {
        method: 'delete'
    });
    if (result.data.value?.success) {
        await refreshFamily();
    }
}

</script>