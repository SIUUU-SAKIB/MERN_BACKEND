import { AppError } from "../../errors/AppError";
import { IDivision } from "./division.interface";
import { DivisionModel } from "./division.model";

const createDivision = async (payload: IDivision) => {
    const isDivisionExist = await DivisionModel.findOne({ name: payload.name })
    if (isDivisionExist) {
        throw new Error("OOps division already exist")

    }
    const division = await DivisionModel.create({ ...payload })
    return division
}
const getAllDivision = async () => {
    const allDivision = await DivisionModel.find({})
    const totalDivision = await DivisionModel.countDocuments()
    return {
        data: allDivision,
        meta: {
            total: totalDivision
        }

    }
}

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
    const isDivisionExist = await DivisionModel.findOne({ name: payload.name })
    if (isDivisionExist) {
        throw new Error("OOps division already exist")

    }
    const duplicateDivision = await DivisionModel.findOne({
        name: payload.name,
        _id: { $ne: id }
    })
    if (duplicateDivision) {
        throw new AppError("A division already exist.")
    }
    const updateDivision = await DivisionModel.findByIdAndUpdate(id, payload, {
        new: true, runValidators: true
    })
    return updateDivision
}

const deleteDivision = async(id:string) =>{
    await DivisionModel.findOneAndDelete({id})
    return null

}
export const DivisionService = { createDivision, getAllDivision, updateDivision }