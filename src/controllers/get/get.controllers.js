const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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
    getPublishesByUserId

}
