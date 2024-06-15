const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPublishes = async (req, res) => {
  try {
    const publishes = await prisma.publish.findMany({
      include: {
        user: { // Include user details for each publish
          select: {
            FirstNames_user: true,
            LastNames_user: true,
            ImgProfile_user: true,
          },
        },
        coment: { // Include comments for each publish
          select: { // Optionally select specific comment fields
            Id_c: true,
            Content_c: true, // Include comment content
            DateCreated_c: true, // Include comment creation date
          },
        },
      },
      orderBy: {
        DateCreated_p: 'desc', // Order by publish creation date descending
      },
    });

    // Format data as needed
    const formattedPublishes = publishes.map(publish => ({
      postId: publish.id_p,
      userId: publish.user.Id_user,
      userName: `${publish.user.FirstNames_user} ${publish.user.LastNames_user}`,
      userAvatar: publish.user.ImgProfile_user,
      title: publish.Title_p,
      content: publish.Content_p,
      imageUrl: publish.Img_p,
      publicationDate: publish.DateCreated_p,
      comments: publish.coment.map(comment => ({
        commentId: comment.Id_c,
        commentContent: comment.Content_c,
        commentDate: comment.DateCreated_c,
      })),
    }));

    // Send response
    res.json(formattedPublishes);
  } catch (error) {
    console.error('Error retrieving publishes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPublishesByUserId = async (req, res) => {
    try {
      const id = parseInt(req.params.id); // Assuming 'id' refers to the user ID
  
      // Validate user ID (optional)
      const existingUser = await prisma.user.findUnique({
        where: {
          Id_user: id,
        },
      });
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
     
      const publishes = await prisma.publish.findMany({
        where: {
          userId: id, // Filter by user ID
        },
        include: {
          coment: { // Include comments for each publish
            select: { // Optionally select specific comment fields
              Content_c: true, // Include comment content
              DateCreated_c: true, // Include comment creation date
            },
          },
        },
      });
  
      res.status(200).json({ message: 'Publishes retrieved successfully', data: publishes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
 
  


export const getMethods={
    getPublishesByUserId,
    getAllPublishes

}
