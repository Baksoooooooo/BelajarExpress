import bukuModel from "../models/bukuModel.js";
import bukuValidate from "../helper/bukuValidate.js";
import AppError from "../helper/AppError.js";
import redis from "../lib/redis.js";

const CACHE_KEY = "semua_buku";
const CACHE_TTL = 3600;

export const getAll = async (req, res, next) => {
  try {
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      return res
        .status(200)
        .json({ success: true, data: JSON.parse(cached), fromCache: true });
    }
    const data = await bukuModel.getAll();
    await redis.set(CACHE_KEY, JSON.stringify(data), "EX", CACHE_TTL);

    res.status(200).json({ success: true, data, fromCache: false });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = await bukuModel.getById(id);
    if (!data) {
      throw new AppError(`tidak dapat menemukan buku dengan id ${id}`, 404);
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { judul, penulis, harga } = req.body;

    if (!judul || !penulis || !harga) {
      throw new AppError(`judul, penulis dan harga wajib diisi!`, 400);
    }

    if (!bukuValidate(req.body)) {
      throw new AppError(
        `judul dan penulis harus string, harga harus number`,
        400,
      );
    }

    const newData = await bukuModel.create(req.body);
    await redis.del(CACHE_KEY);
    res.status(201).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { judul, penulis, harga } = req.body;
    const existing = await bukuModel.getById(id);

    if (!existing) {
      throw new AppError(`tidak dapat menemukan buku dengan id ${id}`, 404);
    }

    if (!judul || !penulis || !harga) {
      throw new AppError(`judul, penulis dan harga wajib diisi!`, 400);
    }

    if (!bukuValidate(req.body)) {
      throw new AppError(
        `judul dan penulis harus string, harga harus number`,
        400,
      );
    }

    const data = await bukuModel.update(id, req.body);
    await redis.del(CACHE_KEY);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await bukuModel.getById(id);

    if (!existing) {
      throw new AppError(`tidak dapat menemukan buku dengan id ${id}`, 404);
    }

    await bukuModel.remove(id, req.body);
    await redis.del(CACHE_KEY);
    res.status(200).json({
      success: true,
      message: `Buku Dengan id ${id} Berhasil Dihapus`,
    });
  } catch (error) {
    next(error);
  }
};
