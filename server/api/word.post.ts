export default defineEventHandler(async (event) => {
  const body = await readBody<{
    word: string;
    translatedWord: string;
    id: number;
  }>(event);
  if (!body.id || !body.translatedWord || !body.word) {
    return {
      success: false,
      message: "Form not correct",
    };
  }

  const newWord = await prisma.word.create({
    data: {
      word: body.word,
      translatedWord: body.translatedWord,
      wordFamilyId: body.id,
    },
  });

  return {
    success: true,
    message: "Word created",
    word: newWord,
  };
});
