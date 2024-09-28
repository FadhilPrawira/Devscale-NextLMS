import prisma from "@utils/prisma";

export const FlashSaleServices = {
  createSale: async (newAmount: number, courseId: string) => {
    await prisma.flashSale.create({
      data: {
        newAmount,
        courseId,
      },
    });
  },

  getALlFlashSale: async () => {
    const flashSale = await prisma.flashSale.findMany({
      include: {
        course: true,
      },
    });

    return flashSale;
  },

  deleteSale: async (saleId: string) => {
    await prisma.flashSale.delete({
      where: {
        id: saleId,
      },
    });
  },
};
