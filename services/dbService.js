import mongoose from 'mongoose';

const dbURI = 'mongodb+srv://dp:dp12345@cluster0.obxvi.mongodb.net/dev?retryWrites=true&w=majority';
const localDB = 'mongodb://localhost/test';

const connectDB = async () => {
    try{
        await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
        console.log('Connection Established');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDB;