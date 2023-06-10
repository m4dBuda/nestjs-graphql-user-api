-- CreateTable
CREATE TABLE "AppUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idUserType" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTypes" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "AppUser"("email");

-- AddForeignKey
ALTER TABLE
    "AppUser"
ADD
    CONSTRAINT "AppUser_idUserType_fkey" FOREIGN KEY ("idUserType") REFERENCES "UserTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add user types
INSERT INTO
    "UserTypes" ("type", "createdAt", "updatedAt")
VALUES
    ('Administrador', now(), now());

INSERT INTO
    "UserTypes" ("type", "createdAt", "updatedAt")
VALUES
    ('Usuário Padrão', now(), now());

-- Add users
INSERT INTO
    "AppUser" (
        "name",
        "email",
        "password",
        "idUserType",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        'João Otávio Carvalho',
        'otavioc.dev@gmail.com',
        'password123',
        1,
        now(),
        now()
    );