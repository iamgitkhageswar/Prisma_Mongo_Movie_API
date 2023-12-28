import {Router} from "express"
import {destroy, index, search, store, update} from "../controllers/MovieController.js"
const router = Router()

router.get("/" ,index)
router.post("/" ,store)
router.put("/:id" ,update)
router.delete("/:id" ,destroy)
router.get("/search" ,search)

export default router