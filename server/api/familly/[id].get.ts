import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const idParams = getRouterParam(event, "id");
  if (!idParams) {
    return {
      success: false,
      message: "Unable to get id params",
      words: [],
    };
  }
  const id = +idParams;
  if (id == null) {
    return {
      success: false,
      message: "Unable to convert to id",
      words: [],
    };
  }

  if (id === 0) {
    const words = await prisma.word.findMany();
    return {
      success: true,
      message: "Returning all words",
      words,
    };
  }

  const words = await prisma.word.findMany({
    where: {
      wordFamilyId: id,
    },
  });
  if (!words) {
    return {
      success: false,
      message: "Not words found",
      words: [],
    };
  }

  return {
    success: false,
    message: "Found",
    words,
  };
});
