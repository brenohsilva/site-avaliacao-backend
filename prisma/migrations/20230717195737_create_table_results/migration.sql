-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);
