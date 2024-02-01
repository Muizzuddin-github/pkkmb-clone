const errorHandling = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  return res.status(500).json({ message: err.message });
};

export default errorHandling;
