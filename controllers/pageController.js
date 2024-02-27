import Photo from '../models/photo.js';

const getAddPage = (req, res) => {
  res.render('add');
}

const getAboutPage = (req, res) => {
  res.render('about');
};

const getEditPage = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 3;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render('index', {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage)
  });
};

export default { getAddPage, getAboutPage, getEditPage };
