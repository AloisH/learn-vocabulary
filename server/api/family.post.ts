export default defineEventHandler(async (event) => {
  const body = await readBody<{ family: string }>(event);

  const familyItem = await prisma.wordFamily.findFirst({
    where: {
      family: body.family,
    },
  });

  if (familyItem) {
    return {
      success: false,
      message: "Familly already exist",
    };
  }

  await prisma.wordFamily.create({
    data: {
      family: body.family,
    },
  });

  return {
    success: true,
    message: "Familly created",
  };
});
