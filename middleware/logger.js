const logger = (req, res, next) => {
  const waktu = new Date().toISOString();
  console.log(
    `method ${req.method} dijalankan pada endpoint '${req.url}' Time: ${waktu}`,
  );
  next();
};

export default logger;
