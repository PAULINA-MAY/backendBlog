const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deletePublishById = async (req, res) => {
    const { id } = req.params; 

    try {
        const publish = await prisma.publish.findUnique({
            where: { id_p: Number(id) },
            include: { coment: true },
        });
        if (!publish) {
            return res.status(404).json({ message: 'Publish not found' });
        }
        await prisma.coment.deleteMany({
            where: { Id_p_FK: Number(id) },
        });
        await prisma.publish.delete({
            where: { id_p: Number(id) },
        });

        res.status(200).json({ message: 'Publish deleted successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteMethods={
    deletePublishById
};
