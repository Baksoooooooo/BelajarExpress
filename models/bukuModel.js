import prisma from "../lib/client.js";

const getAll = async () => await prisma.buku.findMany();
const getById = async (id) => await prisma.buku.findUnique({ where: { id } });
const create = async (data) => {
  return await prisma.buku.create({ data });
};
const update = async (id, data) => {
  return await prisma.buku.update({ where: { id }, data });
};

const remove = async (id) => {
  return await prisma.buku.delete({ where: { id } });
};

export default { getAll, getById, create, update, remove };
