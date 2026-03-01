// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status ?? err.statusCode ?? 500;
  const body = { error: err.message };

  if (process.env.NODE_ENV !== 'production') {
    body.stack = err.stack;
  }

  res.status(status).json(body);
}
