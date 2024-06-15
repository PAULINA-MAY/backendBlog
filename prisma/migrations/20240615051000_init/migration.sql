-- CreateTable
CREATE TABLE `User` (
    `Id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstNames_user` VARCHAR(191) NOT NULL,
    `LastNames_user` VARCHAR(191) NOT NULL,
    `Email_user` VARCHAR(191) NOT NULL,
    `Password_user` VARCHAR(191) NOT NULL,
    `ImgProfile_user` VARCHAR(191) NOT NULL,
    `DateCreated_user` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DateModified_user` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_Email_user_key`(`Email_user`),
    PRIMARY KEY (`Id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `Id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_user_FK` INTEGER NOT NULL,
    `Name_rol` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `Rol_Id_user_FK_key`(`Id_user_FK`),
    PRIMARY KEY (`Id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publish` (
    `id_p` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_u_FK` INTEGER NOT NULL,
    `Title_p` VARCHAR(191) NOT NULL,
    `Content_p` VARCHAR(191) NOT NULL,
    `Img_p` VARCHAR(191) NOT NULL,
    `DateCreated_p` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Publish_Id_u_FK_idx`(`Id_u_FK`),
    PRIMARY KEY (`id_p`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coment` (
    `Id_c` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_p_FK` INTEGER NOT NULL,
    `Content_c` VARCHAR(191) NOT NULL,
    `DateCreated_c` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Id_c`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rol` ADD CONSTRAINT `Rol_Id_user_FK_fkey` FOREIGN KEY (`Id_user_FK`) REFERENCES `User`(`Id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publish` ADD CONSTRAINT `Publish_Id_u_FK_fkey` FOREIGN KEY (`Id_u_FK`) REFERENCES `User`(`Id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coment` ADD CONSTRAINT `Coment_Id_p_FK_fkey` FOREIGN KEY (`Id_p_FK`) REFERENCES `Publish`(`id_p`) ON DELETE RESTRICT ON UPDATE CASCADE;
