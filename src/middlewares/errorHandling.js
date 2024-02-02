const errorHandling = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err.code === 11000 && err.keyPattern) {
    return res.status(400).json({ message: "anda sudah mendaftar" });
  }

  return res.status(500).json({ message: err.message });
};

export default errorHandling;
