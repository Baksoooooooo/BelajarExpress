const cekHarga = (req, res, next) => {
  const { harga } = req.body;

  if (typeof harga === 'number' && harga > 100000000) {
    return res.status(400).json({
      success: false,
      message: `harga tidak boleh lebih dari 100 juta`,
    });
  }
  next();
};

export default cekHarga;
