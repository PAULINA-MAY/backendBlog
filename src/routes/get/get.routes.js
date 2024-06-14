import { Router } from "express"
import { getMethods } from "../../controllers/get/get.controllers";
const {validateCreate} = require('../../validators/validator')
const checkAuth = require('../../middleware/checkAuth')
const router = Router();

router.get("/getPublishByIdUser/:id", checkAuth, getMethods.getPublishesByUserId )

export default router;