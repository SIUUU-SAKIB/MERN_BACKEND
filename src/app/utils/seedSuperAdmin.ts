import bcrypt from "bcryptjs";
import { UserModel } from "../modules/user/user.model";
import { hashPassword } from "./bcryptJs";

export const seedSuperAdmin = async () => {
    const superAdmin = {
        name: "Super_Admin",
        email: "superadmin123@gmail.com",
        password: "Sakib123**",
        role: "SUPER_ADMIN",
    };

    const findAdmin = await UserModel.findOne({ email: superAdmin.email });
    if (findAdmin) {
        return "Super admin already exists";
    }else{
        console.log("Super Admin seed successfull")
    }

    const hashedPassword =await hashPassword(superAdmin.password);

    const sAdmin = await UserModel.create({
        ...superAdmin,
        password: hashedPassword,
    });

    return sAdmin;
};
