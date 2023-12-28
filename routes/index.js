import movieRoutes from "./movieRoute.js"
import castRoutes from "./castRoute.js"
import {Router} from "express"

const router = Router()

router.use("/api/movie" ,movieRoutes)
router.use("/api/cast" ,castRoutes)

export default router