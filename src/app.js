import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json" assert { type: "json" };

//import userRoutes from "./routes/userRoutes.js"
import { authMiddleware } from "./middleware/authMiddlware.js"
import { login, register } from "./controllers/authController.js"
import { addCredit, deleteCredit, getAllByUser, updateCredit } from "./controllers/creditsController.js"
import { addCreditType } from "./controllers/creditTypesController.js"
import { getUser, updateUserProfile } from "./controllers/usersController.js";

dotenv.config()

const app = express()
const router = express.Router()
app.use(express.json())

router.post("/register", register);
router.post("/login", login);

router.get("/creditsByUser", authMiddleware, getAllByUser);
router.post("/credit", authMiddleware, addCredit);
router.patch("/credit", authMiddleware, updateCredit);
router.delete("/credit", authMiddleware, deleteCredit);

router.post("/credit-type", addCreditType);

router.get("/profile", authMiddleware, getUser)
router.patch("/profile", authMiddleware, updateUserProfile)

app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
