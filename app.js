import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import photo from './models/photo.js';
import photoControllers from './controllers/photoControllers.js';
import pageController from './controllers/pageController.js'; // Doğru yazıma dikkat edin

 
const app = express();

// Database connect
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods:['POST','GET']
}));

// ROUTES
app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:id', photoControllers.getPhoto);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);

app.get('/about',pageController.getAboutPage);
app.get('/add',pageController.getAddPage);
app.get('/photos/edit/:id',pageController.getEditPage );

const port = 3000;
app.listen(port, () => {
  console.log(`Server ${port} portunda dinleniyor`);
});
