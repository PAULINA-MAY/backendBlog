const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cloudinary = require("../../cloudinary");

const publishCreate = async (req, res) => {
  try {
    const id = parseInt(req.params.id); 
    const image = req.file; 
    const { title, content } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user with the provided ID exists
    const existingUser = await prisma.user.findUnique({
      where: {
        Id_user: id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const urlImage = await cloudinary.uploader.upload(image.path);
    const newPublish = await prisma.publish.create({
      data: {
        Id_u_FK : id,
        Title_p: title,
        Content_p: content,
        Img_p: urlImage ? urlImage.url : null
      },
      include: {
        user: {
          select: { FirstNames_user: true, Email_user: true },
        },
      },
    });

    res.status(201).json({ message: 'Publish created successfully', data: newPublish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const comentCreate = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Assuming 'id' refers to the publish ID
    const { content } = req.body;

    if (!id || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const existingPublish = await prisma.publish.findUnique({
      where: {
        id_p: id,
      },
    });

    if (!existingPublish) {
      return res.status(404).json({ message: 'Publish not found' });
    }
    const newComent = await prisma.coment.create({
      data: {
        Id_p_FK: id,
        Content_c: content,
      },
    });

    res.status(201).json({ message: 'Comment created successfully', data: newComent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




export const postMethods={
    publishCreate,
    comentCreate

}
