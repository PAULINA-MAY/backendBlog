import { Router } from "express"
import { postMethods } from "../../controllers/post/post.controllers";
const {validateCreate} = require('../../validators/validator')
const checkAuth = require('../../middleware/checkAuth')
import { upload } from "../../middleware/uploadImage";
const router = Router();

router.post("/createPublish/:id",checkAuth, upload.single('file'), postMethods.publishCreate  )
router.post("/createComent/:id", checkAuth, postMethods.comentCreate )
export default router;