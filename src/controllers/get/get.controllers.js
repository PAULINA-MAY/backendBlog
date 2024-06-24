const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPublishes = async (req, res) => {
  try {
    const publishes = await prisma.publish.findMany({
      include: {
        user: { 
          select: {
            FirstNames_user: true,
            LastNames_user: true,
            ImgProfile_user: true,
          },
        },
        coment: { 
          select: { 
            Id_c: true,
            Content_c: true, 
            DateCreated_c: true, 
          },
        },
      },
      orderBy: {
        DateCreated_p: 'desc', 
      },
    });


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
          Id_u_FK : id, 
        },
        include: {
          user: { 
            select: {
              FirstNames_user: true,
              LastNames_user: true,
              ImgProfile_user: true,
            },
          },
          coment: { 
            select: { 
              Content_c: true, 
              DateCreated_c: true, 
            },
          },
        },
      });
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
  
      res.status(200).json(formattedPublishes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
 

  


export const getMethods={
    getPublishesByUserId,
    getAllPublishes

}
