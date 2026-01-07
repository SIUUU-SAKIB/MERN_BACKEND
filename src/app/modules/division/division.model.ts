import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";


const divisionSchema = new Schema<IDivision>({
    name: { type: String, required: true, unique: true },
    slug: { type: String, uniqnue: true },
    thumbnail: { type: String },
    description: { type: String }
}, {
    timestamps: true, versionKey: false
})


divisionSchema.pre("save", async function (next) {
    if (!this.isModified("name")) return

    const baseSlug = this.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    let slug = `${baseSlug}-division`;
    let counter = 1;

    while (await DivisionModel.exists({ slug })) {
        slug = `${baseSlug}-division-${counter}`;
        counter++;
    }

    this.slug = slug;

});

export const DivisionModel = model<IDivision>("Division", divisionSchema)
