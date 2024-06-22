import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const data = prisma.wordFamily.findMany();
    return data;
});