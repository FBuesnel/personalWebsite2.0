-- CreateEnum
CREATE TYPE "RunType" AS ENUM ('EASY', 'LONG', 'WORKOUT', 'RACE');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('QUEUE', 'READING', 'FINISHED');

-- CreateEnum
CREATE TYPE "ImmersionCategory" AS ENUM ('LISTENING', 'READING', 'SPEAKING', 'WRITING');

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "distanceMi" DOUBLE PRECISION NOT NULL,
    "movingTimeSec" INTEGER NOT NULL,
    "avgHR" INTEGER,
    "type" "RunType" NOT NULL DEFAULT 'EASY',
    "note" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "externalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "totalPages" INTEGER,
    "currentPage" INTEGER NOT NULL DEFAULT 0,
    "status" "BookStatus" NOT NULL DEFAULT 'QUEUE',
    "startedAt" TEXT,
    "finishedAt" TEXT,
    "rating" INTEGER,
    "tags" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiftTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exercises" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LiftTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiftSession" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "templateName" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiftSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiftSet" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "setOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LiftSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImmersionEntry" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "category" "ImmersionCategory" NOT NULL,
    "minutes" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImmersionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Run_externalId_key" ON "Run"("externalId");

-- CreateIndex
CREATE INDEX "Run_date_idx" ON "Run"("date");

-- CreateIndex
CREATE INDEX "LiftSession_date_idx" ON "LiftSession"("date");

-- CreateIndex
CREATE INDEX "ImmersionEntry_date_idx" ON "ImmersionEntry"("date");

-- AddForeignKey
ALTER TABLE "LiftSet" ADD CONSTRAINT "LiftSet_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LiftSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
