const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cloudinary = require("../../cloudinary");

const publishCreate = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Assuming 'id' refers to the user ID
    const image = req.file; // Assuming image upload using a middleware like multer
    const { title, content } = req.body;

    // Validate input data (enhance security and error handling)
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

    const urlImage = await cloudinary.uploader.upload(image.path); // Upload image if provided

    // Efficiently create publish and handle image upload if applicable
    const newPublish = await prisma.publish.create({
      data: {
        userId: id,
        Title_p: title,
        Content_p: content,
        Img_p: urlImage ? urlImage.url : null, // Handle image path if uploaded
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

    // Validate input data (enhance security and error handling)
    if (!id || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if publish with the given ID exists
    const existingPublish = await prisma.publish.findUnique({
      where: {
        id_p: id,
      },
    });

    if (!existingPublish) {
      return res.status(404).json({ message: 'Publish not found' });
    }

    // Create the comment with relationship to publish
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
