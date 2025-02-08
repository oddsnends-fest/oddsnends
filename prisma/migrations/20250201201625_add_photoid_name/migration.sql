/*
  Warnings:

  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hobby` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoid_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spirit_animal` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Hobby" AS ENUM ('READING', 'PAINTING', 'GAMING', 'COOKING', 'PHOTOGRAPHY', 'TRAVELING', 'GARDENING', 'FISHING', 'WRITING');

-- CreateEnum
CREATE TYPE "SpiritAnimal" AS ENUM ('CAT', 'BUTTERFLY', 'FISH', 'DUCK', 'SQUIRREL', 'WATER_MONITOR', 'SWAN', 'DOG', 'OTTER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hobby" "Hobby" NOT NULL,
ADD COLUMN     "photoid_name" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL,
ADD COLUMN     "spirit_animal" "SpiritAnimal" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
