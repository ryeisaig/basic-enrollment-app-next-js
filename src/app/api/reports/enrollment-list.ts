import { createReadStream } from "fs";
import type { NextApiRequest, NextApiResponse } from 'next';
import { pipeline } from "stream";
import clientPromise from '../../../lib/mongodb';


export default async function handler( req: NextApiRequest, res: NextApiResponse<any>) {
//   const client = await clientPromise;
//   const db = client.db('enrollment');

//   const data = await db.collection("students").find().toArray();
//   const pdfData = generatePdf(data);

  const data = [
    { column1: "Data 1", column2: "Data 2", column3: "Data 3" },
    { column1: "Data 4", column2: "Data 5", column3: "Data 6" },
  ];
  const pdfData = generatePdf(data);


  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="report.pdf"');

  res.send(pdfData);
}

function generatePdf(data: any) {
    // Use a PDF generation library like pdfmake or Puppeteer to generate the PDF
    // Here's an example using pdfmake:
    const pdfmake = require("pdfmake");
    const fonts = {
      Roboto: {
        normal: "public/fonts/Roboto-Regular.ttf",
        bold: "public/fonts/Roboto-Medium.ttf",
        italics: "public/fonts/Roboto-Italic.ttf",
        bolditalics: "public/fonts/Roboto-MediumItalic.ttf",
      },
    };
    const printer = new pdfmake(fonts);
    
    const tableBody = [];
    // Add table header
    tableBody.push(["Column 1", "Column 2", "Column 3"]);
    // Add data to table
    data.forEach((item: any) => {
      const row = [
        item.column1 || "", // Check for missing values
        item.column2 || "",
        item.column3 || "",
      ];
      tableBody.push(row);
    });
  
    const docDefinition = {
      content: [
        {
          image: "public/logo.png",
          width: 100,
        },
        {
          text: "Report Title",
          style: "header",
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: tableBody,
          },
          layout: "lightHorizontalLines",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };
    
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks:any[] = [];
    pdfDoc.on("data", (chunk: any) => {
      chunks.push(chunk);
    });
    pdfDoc.end();
    return Buffer.concat(chunks);
  }
  