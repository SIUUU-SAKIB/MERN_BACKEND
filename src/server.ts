import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";
import { envVariables } from "./app/constants/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVariables.MONGO_URL);
        console.log("CONNECTED TO DATABASE ✅✅✅");
        await seedSuperAdmin()
            .then((res) => console.log("Super Admin Seed 🎉"))
            .catch((error) => console.log("Error when seeding Super_Admin", error))
        server = app.listen(envVariables.PORT, () => {
            console.log(`SERVER RUNNING: http://localhost:${envVariables.PORT} 😍😍😍`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();

const gracefulShutdown = (signal: string) => {
    console.log(`${signal} detected — shutting down gracefully...`);

    if (server) {
        server.close(() => {
            console.log("Server closed.");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};
process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (error) => {
    console.error("UNCAUGHT EXCEPTION:", error);
});


process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
