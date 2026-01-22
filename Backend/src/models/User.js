import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    avatarUrl: {
        type: String, // link cdn hiển thi        
    },
    avatarId: {
        type: String, // cloundinary cần khi xóa ảnh
    },
    bio: {
        type: String,
        maxLength:  500
    },
    phone: {
        type: String,
        sparse: true // cho null nhưng nếu nhập thì không được trùng
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema)
export default User