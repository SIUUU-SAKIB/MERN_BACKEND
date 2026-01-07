import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, Iuser, Role } from "./user.interface";
const authProviderSchema = new Schema<IAuthProvider>(
    {
        provider: { type: String, required: true },
        providerId: { type: String, required: true }
    },
    {
        versionKey: false
    }
)
const userSchema = new Schema<Iuser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        role: {
            type: String,
            enum: Object.values(Role),
            default: "USER"

        },
        phone: { type: String },
        picture: { type: String },
        address: { type: String },
        isActive: { type: String, enum: Object.values(IsActive), default: IsActive.ACTIVE },
        isVerified: { type: Boolean, default: false },
        auths: [authProviderSchema],


    }, {
    timestamps: true,
    versionKey: false
}
)

export const UserModel = model<Iuser>("User", userSchema)