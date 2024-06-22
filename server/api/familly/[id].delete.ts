export default defineEventHandler(async (event) => {
  const idParams = getRouterParam(event, "id");
  if (!idParams) {
    return {
      success: false,
      message: "Unable to get id params",
    };
  }
  const id = +idParams;
  if (!id || id === 0) {
    return {
      success: false,
      message: "Unable to convert to id",
    };
  }

  const family = await prisma.wordFamily.findFirst({
    include: {
      word: true,
    },
    where: {
      id,
    },
  });

  if (!family) {
    return {
      success: false,
      message: "Familly does not exist",
    };
  }

  if (family.word.length !== 0) {
    return {
      success: false,
      message: "Family contains word, unable to delete",
    };
  }

  await prisma.wordFamily.delete({
    where: {
      id,
    },
  });
  return {
    success: true,
    message: "Family deleted",
  };
});
