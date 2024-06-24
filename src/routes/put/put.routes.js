import { Router } from "express"
import { putMethods } from "../../controllers/put/put.controllers";
const checkAuth = require('../../middleware/checkAuth')
import { upload } from "../../middleware/uploadImage";
const router = Router();

router.put("/updatePublish/:id",checkAuth, upload.single('file'), putMethods.putPublishById );

export default router;