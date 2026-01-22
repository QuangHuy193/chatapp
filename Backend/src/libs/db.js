import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTSTRING || `mongodb+srv://quanghuylhpq_db_user:YRSsgmrSr7BWvAka@cluster0.etyqg09.mongodb.net/?appName=Cluster0`)
        console.log(`Đã kết nối db`);
    } catch (error) {
        console.log(`Lỗi khi kết nối db`, error);
        process.exit(1)
    }
}