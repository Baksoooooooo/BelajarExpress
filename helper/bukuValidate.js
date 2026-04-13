const bukuValidate = (body) => {
  const { judul, penulis, harga } = body;

  if (
    typeof judul === "string" &&
    judul.trim().length > 0 &&
    typeof penulis === "string" &&
    penulis.trim().length > 0 &&
    typeof harga === "number" &&
    harga > 0
  )
    return true;
  return false;
};

export default bukuValidate;
