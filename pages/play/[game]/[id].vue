<template>
    <div class="h-screen flex flex-col">
        <div>

            <NuxtLink class="w-full" to="/play">
                <Button class="w-full">Back</Button>
            </NuxtLink>
        </div>
        <div>
            Playing gamemode {{ $route.params.game }} with id {{ $route.params.id }}
        </div>
        <div class="h-full" v-if="words && words?.words.length !== 0">
            <div class="flex flex-col h-full">
                <div class="h-full flex items-center justify-center">
                    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {{ words.words[currentIndexWordToFind].word }}
                    </h1>
                </div>
                <div class="flex justify-center">
                    <h1 v-if="isItCorrect === Correct.CORRECT"
                        class="text-green-500 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Congrat! You found the correct answer.
                    </h1>
                    <h1 v-if="isItCorrect === Correct.NOT_CORRECT"
                        class="text-red-500 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        You didn't find the correct answer.
                    </h1>
                </div>
                <div class="px-4 py-4 flex flex-col w-full gap-4">
                    <div class="flex w-full gap-4">
                        <Button :variant="buttonVariant1" :onclick="() => onClickWord(0)" class='h-32 w-full'>
                            {{ words.words[wordsIndex[0]].translatedWord }}
                        </Button>

                        <Button :variant="buttonVariant2" :onclick="() => onClickWord(1)" class='h-32 w-full'>
                            {{ words.words[wordsIndex[1]].translatedWord }}
                        </Button>
                    </div>
                    <div class="flex gap-4">
                        <Button :variant="buttonVariant3" :onclick="() => onClickWord(2)" class='h-32 w-full'>
                            {{ words.words[wordsIndex[2]].translatedWord }}
                        </Button>

                        <Button :variant="buttonVariant4" :onclick="() => onClickWord(3)" class='h-32 w-full'>
                            {{ words.words[wordsIndex[3]].translatedWord }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class=" pt-16 flex justify-center items-center flex-col">
            <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">No vocabulary available</h1>
            <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Please
                add vocabulary for this category</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
enum Correct {
    UNDEFINED = 0,
    CORRECT = 1,
    NOT_CORRECT = 2
}

const route = useRoute();

const id = +route.params.id;
const { data: words } = await useFetch(`/api/familly/${id}`, {
    method: 'get'
});

const currentIndexWordToFind = ref<number>(0);
const wordsIndex = ref<number[]>([0, 0, 0, 0]);
const statusReveal = ref<boolean>(false);
const isItCorrect = ref<Correct>(Correct.UNDEFINED);
const buttonVariant1 = ref<"default" | 'green' | "link" | "destructive" | "outline" | "secondary" | "ghost">('default');
const buttonVariant2 = ref<"default" | 'green' | "link" | "destructive" | "outline" | "secondary" | "ghost">('default');
const buttonVariant3 = ref<"default" | 'green' | "link" | "destructive" | "outline" | "secondary" | "ghost">('default');
const buttonVariant4 = ref<"default" | 'green' | "link" | "destructive" | "outline" | "secondary" | "ghost">('default');

onMounted(async () => {
    updateRound();
});

const getRandomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
}

const updateRound = () => {
    if (!words.value?.words.length || words.value?.words.length === 0) {
        return;
    }

    const nextIndex = getRandomNumber(words.value?.words.length ?? 0);
    currentIndexWordToFind.value = nextIndex;

    const correctAnswerIndex = getRandomNumber(4);

    for (let i = 0; i < 4; i++) {
        if (correctAnswerIndex === i) {
            wordsIndex.value[i] = nextIndex;
            continue;
        }

        const randomWordIndex = getRandomNumber(words.value?.words.length ?? 0);
        wordsIndex.value[i] = randomWordIndex;
    }
}

const onClickWord = (clickIndex: number) => {
    if (statusReveal.value) {
        statusReveal.value = false;

        buttonVariant1.value = 'default';
        buttonVariant2.value = 'default';
        buttonVariant3.value = 'default';
        buttonVariant4.value = 'default';
        isItCorrect.value = Correct.UNDEFINED;
        updateRound();
        return;
    }

    statusReveal.value = true;

    buttonVariant1.value = wordsIndex.value[0] === currentIndexWordToFind.value ? 'green' : 'destructive';
    buttonVariant2.value = wordsIndex.value[1] === currentIndexWordToFind.value ? 'green' : 'destructive';
    buttonVariant3.value = wordsIndex.value[2] === currentIndexWordToFind.value ? 'green' : 'destructive';
    buttonVariant4.value = wordsIndex.value[3] === currentIndexWordToFind.value ? 'green' : 'destructive';


    if (wordsIndex.value[clickIndex] === currentIndexWordToFind.value) {
        isItCorrect.value = Correct.CORRECT;
    } else {
        isItCorrect.value = Correct.NOT_CORRECT;
    }
}
</script>