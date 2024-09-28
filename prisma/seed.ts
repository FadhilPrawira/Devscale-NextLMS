import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import slugify from "slugify";
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { id: "adminSeeder" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      role: "ADMIN",
      password: await bcrypt.hash("12345678", 13),
      isVerified: true,
    },
  });

  const courseAlibabaCloud = await prisma.course.upsert({
    where: { id: "cm1lwgc820000paybfvrtool4" },
    update: {},
    create: {
      id: "cm1lwgc820000paybfvrtool4",
      slug: slugify("Alibaba Cloud Associate - Cloud Computing", { lower: true }),
      title: "Alibaba Cloud Associate - Cloud Computing",
      description: "Course kerjasama Codepolitan",
      price: 30500,
      coverImage: "img_f87302694010a18830a1af71891ef27f.jpg",
      sections: {
        create: [
          {
            title: "Pendahuluan",
            index: 0,
            lessons: {
              create: {
                slug: slugify("Instalasi Next Js", { lower: true }),
                title: "Instalasi Next Js",
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                index: 0,
                isPreview: true,
              },
            },
          },
          {
            title: "Penutup",
            index: 1,
            lessons: {
              create: {
                slug: slugify("Salam Penutup", { lower: true }),
                title: "Two Steps From Hell - Victory",
                videoUrl: "https://www.youtube.com/watch?v=hKRUPYrAQoE",
                index: 0,
              },
            },
          },
        ],
      },
    },
  });
  const matematika = await prisma.course.upsert({
    where: { id: "cm1lwhdgp0001payb4tzvhj9x" },
    update: {},
    create: {
      id: "cm1lwhdgp0001payb4tzvhj9x",
      slug: slugify("Matematika", { lower: true }),
      title: "Matematika",
      description: "Ini induksi matematika",
      price: 30500,
      coverImage: "IMG-20210802-WA0000.jpg",
      sections: {
        create: [
          {
            title: "Pendahuluan",
            index: 0,
            lessons: {
              create: {
                slug: slugify("Pembukaan kelas matematika", { lower: true }),
                title: "Pembukaan kelas matematika",
                videoUrl: "dQw4w9WgXcQ",
                index: 0,
              },
            },
          },
          {
            title: "Penutup",
            index: 1,
            lessons: {
              create: {
                slug: slugify("Penutupan Kelas Matematika", { lower: true }),
                title: "Penutupan Kelas Matematika",
                videoUrl: "https://www.youtube.com/watch?v=hKRUPYrAQoE",
                index: 0,
                isPreview: true,
              },
            },
          },
        ],
      },
    },
  });
  const regularUser = await prisma.user.upsert({
    where: { id: "regularUserSeeder" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Bob",
      role: "USER",
      password: await bcrypt.hash("12345678", 13),
      isVerified: true,
      courseAccess: {
        create: [
          {
            courseId: courseAlibabaCloud.id,
          },
          {
            courseId: matematika.id,
          },
        ],
      },
      transactions: {
        create: [
          {
            amount: courseAlibabaCloud.price,
            courseId: courseAlibabaCloud.id,
            paymentStatus: "PAID",
            paymentLink: "https://fadhil-prawira.mayar.shop/invoices/9xulo6bfd",
          },
          {
            amount: matematika.price,
            courseId: matematika.id,
            paymentStatus: "PAID",
            paymentLink: "https://fadhil-prawira.mayar.shop/invoices/9xulo6bfd",
          },
        ],
      },
      certificates: {
        create: [
          {
            courseId: courseAlibabaCloud.id,
            status: "NO_REQUEST",
          },
          {
            courseId: matematika.id,
            status: "UNDER_REVIEW",
          },
        ],
      },
    },
  });
  console.log({ admin, regularUser, courseAlibabaCloud, matematika });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
