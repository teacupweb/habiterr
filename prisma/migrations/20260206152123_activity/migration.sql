-- CreateTable
CREATE TABLE "activity" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "completed" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
