import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { globalError } from "./app/middlewares/globalError"
import { notFound } from "./app/middlewares/notFound"
import { userRoutes } from "./app/modules/user/user.routes"
import { authRoutes } from "./app/modules/auth/auth.route"
import { StatusCodes } from "http-status-codes"
const app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/auth", authRoutes)

app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.ACCEPTED).json({
        status: "HEALTHY 😊",
        message: "FULLSTACK BACKEND SERVER WORKING PERFECTLY 😍🎉🚀"
    })
})
app.use(notFound)
app.use(globalError)
export default app