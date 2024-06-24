
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require("../../cloudinary");

const putPublishById = async (req, res) => {
    const { id } = req.params; 
    const image = req.file; 
    const { Title_p, Content_p } = req.body; 

    try {
        const publish = await prisma.publish.findUnique({
            where: { id_p: Number(id) },
        });

        if (!publish) {
            return res.status(404).json({ message: 'Publish not found' });
        }

        const urlImage = await cloudinary.uploader.upload(image.path);
        const updatedPublish = await prisma.publish.update({
            where: { id_p: Number(id) },
            data: {
                Title_p: Title_p ?? publish.Title_p,
                Content_p: Content_p ?? publish.Content_p,
                Img_p: urlImage ? urlImage.url : null
            },
        });

        res.status(200).json(updatedPublish);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const putMethods= {
    putPublishById
};
