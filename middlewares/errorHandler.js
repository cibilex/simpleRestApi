module.exports = (err, req, res, next) => {
  let code;

  //custom hatalar
  if (err instanceof (ReferenceError || TypeError || SyntaxError)) code = 500;
  if (err.code == "LIMIT_FILE_SIZE") err.code = 400;
  //unique hatası
  if (err.code == 11000) {
    err.code = 401;
    let destination = Object.keys(err.keyPattern)[0];
    err.message = `pls enter a unique ${destination}`;
  }
  //database save errors
  if (err.name === "ValidationError") {
    err.message = err.message.split(":")[2].split(",")[0];
  }
  console.log(err.type || err.name, err.message, err.code || code || 500);
  res.status(err.code || code || 500).json({
    success: false,
    errName: err.type || err.name,
    errMessage: err.message,
    errCode: err.code || code || 500,
  });
};
