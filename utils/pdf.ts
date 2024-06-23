// pdfUtils.ts
import { PDFDocument } from 'pdf-lib';

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const textContent = await Promise.all(
      pages.map(async (page) => page.getTextContent())
    );
    return textContent.map((content) => content.items.map((item: any) => item.str).join(' ')).join('\n');
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}
