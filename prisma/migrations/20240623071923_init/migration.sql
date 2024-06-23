-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "translatedWord" TEXT NOT NULL,
    "wordFamilyId" INTEGER NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordFamily" (
    "id" SERIAL NOT NULL,
    "family" TEXT NOT NULL,

    CONSTRAINT "WordFamily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordFamily_family_key" ON "WordFamily"("family");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_wordFamilyId_fkey" FOREIGN KEY ("wordFamilyId") REFERENCES "WordFamily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
