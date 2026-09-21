-- AlterEnum
ALTER TYPE "PostKind" ADD VALUE 'REVIEW';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bookId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
