import prisma from "../lib/client.js";

const findByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

const create = async (data) => {
  return await prisma.user.create({ data });
};

export default { findByEmail, create };
