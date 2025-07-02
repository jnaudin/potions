-- CreateTable
CREATE TABLE "Potion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "discovered" BOOLEAN NOT NULL DEFAULT false,
    "discoverPrice" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PotionIngredient" (
    "potionId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("potionId", "ingredientId"),
    CONSTRAINT "PotionIngredient_potionId_fkey" FOREIGN KEY ("potionId") REFERENCES "Potion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PotionIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameState" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "money" INTEGER NOT NULL DEFAULT 1000,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Potion_name_key" ON "Potion"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
