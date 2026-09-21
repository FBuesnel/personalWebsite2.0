-- DropForeignKey
ALTER TABLE "HabitLog" DROP CONSTRAINT "HabitLog_habitId_fkey";

-- DropForeignKey
ALTER TABLE "LiftSet" DROP CONSTRAINT "LiftSet_sessionId_fkey";

-- DropTable
DROP TABLE "Habit";

-- DropTable
DROP TABLE "HabitLog";

-- DropTable
DROP TABLE "LiftSet";

-- DropTable
DROP TABLE "LiftTemplate";

