-- CreateTable
CREATE TABLE "VoterInput" (
    "NID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoterInput_pkey" PRIMARY KEY ("NID")
);

-- CreateTable
CREATE TABLE "Voter" (
    "NID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("NID")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoterInput_NID_key" ON "VoterInput"("NID");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_NID_key" ON "Voter"("NID");