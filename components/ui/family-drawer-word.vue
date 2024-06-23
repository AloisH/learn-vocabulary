<template>
    <div v-for="word in words">
        <div class="flex justify-between w-full border-b items-center">
            <div>

                <h1 class="scroll-m-20 text-m font-bold tracking-tight">{{ word.word }}</h1>
                <h2 class="scroll-m-20  pb-2 text-sm font-semibold tracking-tight transition-colors first:mt-0">
                    {{ word.translatedWord }}
                </h2>
            </div>

            <AlertDialog>
                <AlertDialogTrigger as-child>
                    <Button size="xs" variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Are you sure you want to delete the word {{ word.word }} ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your family
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction :onclick="async () => onDeleteWord(word.id, family.id)">Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    </div>
    <form class="pt-8" @submit="onSubmitCreateWord">
        <FormField v-slot="{ componentField }" name="word">
            <FormItem>
                <FormLabel>Word</FormLabel>
                <FormControl>
                    <Input placeholder="word" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="translatedWord">
            <FormItem>
                <FormLabel>Translated Word</FormLabel>
                <FormControl>
                    <Input placeholder="word" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <div class="mt-8 flex justify-end gap-4">
            <DrawerClose as-child>
                <Button variant="outline">
                    Cancel
                </Button>
            </DrawerClose>
            <Button type="submit">
                Add
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';

type Word = {
    id: number;
    word: string;
    translatedWord: string;
    wordFamilyId: number;
};

const emit = defineEmits(['reloadWords']);

const props = defineProps<{
    family: {
        id: number,
        family: string,
    },
    words: Word[],
}>();

const createWordFormSchema = toTypedSchema(z.object({
    word: z.string().min(1),
    translatedWord: z.string().min(1),
    id: z.number(),
}));

const createWordForm = useForm({
    validationSchema: createWordFormSchema
});

createWordForm.setFieldValue('id', props.family.id);

const onSubmitCreateWord = createWordForm.handleSubmit(async (values) => {
    createWordForm.resetForm();
    createWordForm.setFieldValue('id', props.family.id);
    const result = await $fetch(`/api/word`, {
        method: 'post',
        body: values,
    });
    if (!result.success) {
        console.log("Error while creating word");
    }
    emit('reloadWords');
});

const onDeleteWord = async (id: number, familyId: number) => {
    const result = await $fetch(`/api/word/${id}`, {
        method: 'delete'
    });
    if (result.success) {
        emit('reloadWords');
    }
}
</script>