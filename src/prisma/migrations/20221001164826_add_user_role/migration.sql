-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    MODIFY `forgotToken` TEXT NULL;
