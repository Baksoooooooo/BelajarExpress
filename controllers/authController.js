import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import generateToken from "../helper/generateToken.js";
import AppError from "../helper/AppError.js";

export const register = async (req, res, next) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      throw new AppError("nama, email dan password wajib diisi", 400);
    }

    const existing = await userModel.findByEmail(email);
    if (existing) {
      throw new AppError("email sudah terdaftar", 400);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      nama,
      email,
      password: hashPassword,
    });

    const { password: _, ...userTanpaPassword } = user;

    res.status(201).json({ success: true, data: userTanpaPassword });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("nama, email dan password wajib diisi", 400);
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new AppError("email tidak terdaftar", 401);
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new AppError("Password Salah", 401);
    }

    const token = generateToken(user.id);
    const { password: _, ...userTanpaPassword } = user;

    res.status(200).json({ success: true, data: userTanpaPassword, token });
  } catch (error) {
    next(error);
  }
};
