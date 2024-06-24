import { Router } from "express"
import { deleteMethods } from "../../controllers/delete/delete.controllers";
const checkAuth = require('../../middleware/checkAuth')
const router = Router();

router.delete("/deletetPublishById/:id", checkAuth, deleteMethods.deletePublishById  )

export default router;