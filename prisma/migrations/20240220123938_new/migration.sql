/*
  Warnings:

  - The primary key for the `Voter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VoterInput` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Voter_NID_key";

-- DropIndex
DROP INDEX "VoterInput_NID_key";

-- AlterTable
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_pkey",
ALTER COLUMN "NID" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ADD CONSTRAINT "Voter_pkey" PRIMARY KEY ("NID");

-- AlterTable
ALTER TABLE "VoterInput" DROP CONSTRAINT "VoterInput_pkey",
ALTER COLUMN "NID" SET DATA TYPE TEXT,
ADD CONSTRAINT "VoterInput_pkey" PRIMARY KEY ("NID");