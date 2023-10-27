/*
  Warnings:

  - You are about to drop the column `toUder_id` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `toUser_id` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "toUder_id",
ADD COLUMN     "toUser_id" INTEGER NOT NULL;
