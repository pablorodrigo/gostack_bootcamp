export default async (request, response, next) => {
  console.log('middleware');

  next();
};
