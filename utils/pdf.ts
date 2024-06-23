import { readFile } from 'fs/promises';
import pdf from 'pdf-parse';

export async function extractTextFromPDF(pdfPath: string): Promise<string> {
    try {
      const dataBuffer = await readFile(pdfPath);
      const pdfData = await pdf(dataBuffer);
      return pdfData.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw error;
    }
  }