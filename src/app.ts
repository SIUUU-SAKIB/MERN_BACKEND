import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { globalError } from "./app/middlewares/globalError"
import { notFound } from "./app/middlewares/notFound"
import { userRoutes } from "./app/modules/user/user.routes"
import { authRoutes } from "./app/modules/auth/auth.route"
import { StatusCodes } from "http-status-codes"
import passport from "passport"
import expressSession from "express-session"
import "./app/config/passport";
import { envVariables } from "./app/constants/env"
import { DivisionRoutes } from "./app/modules/division/division.route"
import { TourRoutes } from "./app/modules/tour/tour.route"
import { bookingRoutes } from "./app/modules/booking/booking.routes"
// import { configurePassport } from "./app/config/passport"

const app = express()
// configurePassport()
// PASSPORT CONFIGURATION
app.use(expressSession({
    secret: envVariables.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use('/api/v1/tour', TourRoutes)
app.use('/api/v1/booking', bookingRoutes)
app.use("/api/v1/division", DivisionRoutes)

// DEFAULT REQUEST
app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.ACCEPTED).json({
        status: "HEALTHY 😊",
        message: "FULLSTACK BACKEND SERVER WORKING PERFECTLY 😍🎉🚀"
    })
})
app.use(notFound)
app.use(globalError)
export default app