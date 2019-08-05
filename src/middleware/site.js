module.exports = function (options = {}) {
  return function site(req, res, next) {
    console.log('site middleware is running');
    next();
  };
};
