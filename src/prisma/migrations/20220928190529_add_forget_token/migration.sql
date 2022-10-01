/*
  Warnings:

  - Added the required column `forgotToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `forgotToken` VARCHAR(191) NOT NULL;
