
import { Document, Schema, model } from 'mongoose';
import jwt from "jsonwebtoken";

// user interface
export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	photo?: string;
	getAuthToken: () => string;
}

// user schema
const UserSchema = new Schema<IUser>({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	photo: String,
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: "updatedAt"
	}
});

UserSchema.methods.getAuthToken = function () {
	console.log("get token called--------");
	const { TOKEN_KEY } = process.env
	const token = jwt.sign({
		user: {
			id: this._id
		}
	}, TOKEN_KEY, { expiresIn: 360000000 });

	return token;
}




// Create and export user model
export const UserModel = model<IUser>("User", UserSchema);