"use server";
import fontkit from "@pdf-lib/fontkit";
import { checkIfFileExists, uploadFile } from "@utils/aws";
import prisma from "@utils/prisma";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";

export default async function downloadCertificateAction(_: unknown, formData: FormData) {
  const certificateId = formData.get("certificateId") as string;
  const certificate = await prisma.certificate.findFirst({
    where: {
      id: certificateId,
    },
    include: {
      user: true,
      course: true,
    },
  });

  if (!certificate) {
    redirect("/dashboard/certificates");
  }

  const fileKey = `${certificate.userId}/${certificate.id}.pdf`;

  const isfileExists = await checkIfFileExists(`certificates/${fileKey}`);
  console.log("Apakah file exist?", isfileExists);
  if (!isfileExists) {
    console.log("File does not exist, creating new file");
    console.log("Creating certificate for", certificate.user.name);
    console.log("Course title", certificate.course.title);
    // Reading certificate file template
    const certificateTemplatePath = path.resolve("public", "CertificateTemplate.pdf");
    const certificateTemplate = await fs.readFile(certificateTemplatePath);
    const fontPath = path.resolve("public", "Montserrat-Bold.ttf");
    const font = await fs.readFile(fontPath);
    const pdfDoc = await PDFDocument.load(certificateTemplate);

    // First page PDF
    const page = pdfDoc.getPage(0);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(font);
    const letterSpacing = -0.95;

    // Modify template
    // Add name
    let nameXPos = 196;
    for (const char of certificate.user.name) {
      page.drawText(char, {
        x: nameXPos,
        y: 268,
        size: 40,
        font: customFont,
        color: rgb(0, 0, 0),
      });
      nameXPos += customFont.widthOfTextAtSize(char, 40) + letterSpacing;
    }

    // Add course title
    let titleXPos = 198;
    for (const char of certificate.course.title) {
      page.drawText(char, {
        x: titleXPos,
        y: 183,
        size: 40,
        font: customFont,
        color: rgb(0, 0, 0),
      });
      titleXPos += customFont.widthOfTextAtSize(char, 40) + letterSpacing;
    }

    // Upload certificate file ke S3
    const pdfBytes = await pdfDoc.save();

    await uploadFile({
      key: fileKey,
      folder: "certificates",
      body: pdfBytes,
    });
  }
  // Redirect ke URL S3
  redirect(`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/devscale-nextlms/certificates/${certificate.userId}/${certificate.id}.pdf`);
}
