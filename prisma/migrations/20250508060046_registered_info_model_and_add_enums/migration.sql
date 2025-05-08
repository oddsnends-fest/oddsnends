/*
  Warnings:

  - The values [INSTAGRAM,FACEBOOK,TIKTOK,LINE,POSTER] on the enum `Channel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Made the column `line_profile_pic` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('STUDENT', 'UNI_STUDENT', 'EMPLOYEE', 'BUSINESS_OWNER', 'FREELANCER', 'OTHERS');

-- CreateEnum
CREATE TYPE "WhatBringsUHere" AS ENUM ('EXPLORING', 'WORKSHOP', 'MUSIC', 'FRIENDS', 'OTHERS');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "email",
ALTER COLUMN "full_name" DROP NOT NULL,
ALTER COLUMN "line_profile_pic" SET NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "photo" DROP NOT NULL,
ALTER COLUMN "occupation" DROP NOT NULL,
ALTER COLUMN "channel" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "hobby" DROP NOT NULL,
ALTER COLUMN "photoid_name" DROP NOT NULL,
ALTER COLUMN "signature" DROP NOT NULL,
ALTER COLUMN "spirit_animal" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RegisteredInfo" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "age_range" TEXT NOT NULL,
    "occupation" "Occupation" NOT NULL,
    "whatBringsUHere" "WhatBringsUHere" NOT NULL,
    "channel" "Channel" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegisteredInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegisteredInfo" ADD CONSTRAINT "RegisteredInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterEnum
BEGIN;
CREATE TYPE "Channel_new" AS ENUM ('SOCIAL_MEDIA', 'WEBSITE', 'FRIENDS', 'INFLUENCER', 'OTHERS');
ALTER TABLE "User" ALTER COLUMN "channel" TYPE "Channel_new" USING ("channel"::text::"Channel_new");
ALTER TABLE "RegisteredInfo" ALTER COLUMN "channel" TYPE "Channel_new" USING ("channel"::text::"Channel_new");
ALTER TYPE "Channel" RENAME TO "Channel_old";
ALTER TYPE "Channel_new" RENAME TO "Channel";
DROP TYPE "Channel_old";
COMMIT;
