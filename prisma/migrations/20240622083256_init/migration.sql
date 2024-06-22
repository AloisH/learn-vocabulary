-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "translatedWord" TEXT NOT NULL,
    "wordFamilyId" INTEGER NOT NULL,
    CONSTRAINT "Word_wordFamilyId_fkey" FOREIGN KEY ("wordFamilyId") REFERENCES "WordFamily" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WordFamily" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "family" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WordFamily_family_key" ON "WordFamily"("family");
