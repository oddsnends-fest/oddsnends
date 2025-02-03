-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NONBINARY', 'OTHERS', 'PREFERNOTTOSAY');

-- CreateEnum
CREATE TYPE "Channel" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'LINE', 'FRIENDS', 'POSTER');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "line_profile_pic" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "photo" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "occupation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "channel" "Channel" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
