
import mongoose from 'mongoose';
const  Schema  = mongoose.Schema;

const PhotoSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
  
const photo = mongoose.model('photo', PhotoSchema);

export default photo;


