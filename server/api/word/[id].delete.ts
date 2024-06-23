import prisma from "~/lib/prisma";

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

  const word = await prisma.word.findFirst({
    where: {
      id,
    },
  });

  if (!word) {
    return {
      success: false,
      message: "Familly does not exist",
    };
  }

  await prisma.word.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Word deleted",
  };
});
