const createService = require('feathers-nedb');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');
const multer = require('multer');
const {
  authenticate
} = require('@feathersjs/authentication').express; // getting feathers' authenticate middleware
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${file.originalname}`) // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 100 // Max field value size `MB`
  }
});
module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const options = {
    Model,
    paginate,
    multi: true // allowing us to store multiple instances of the model, in the same request
  };

  app.use('/uploads',
    // authenticate('jwt'),
    upload.array('files'), (req, _res, next) => {
      const { method } = req;
      if (method === 'POST' || method === 'PATCH') {
        // I believe this middleware should only transfer
        // files to feathers and call next();
        // and the mapping of data to the model shape
        // should be in a hook.
        // this code is only for this demo.
        req.feathers.files = req.files; // transfer the received files to feathers
        //for transforming the request to the model shape
        const body = [];
        for (const file of req.files)
          body.push({
            name: file.originalname,
            file_path: `/assets/uploads/${file.originalname}`,
            //userId: req.user.id
          });
        req.body = method === 'POST' ? body : body[0];
      }
      next();
    }, createService(options));

  const service = app.service('uploads');
  service.hooks(hooks);
};