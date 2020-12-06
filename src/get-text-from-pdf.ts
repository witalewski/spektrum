import * as pdfJs from "pdfjs-dist";

pdfJs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js";

const processDataUrl = async (
  dataUrl: string,
  resolve: (result: string[][] | PromiseLike<string[][]>) => void,
  reject: (reason?: any) => void
) => {
  const data = window.atob(dataUrl.split(",")[1]);
  const loadingTask = pdfJs.getDocument({ data });
  try {
    const pdfDocument = await loadingTask.promise;
    const pagesText: string[][] = [];
    const { numPages } = pdfDocument;
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      pagesText.push(textContent.items.map(({ str }) => str));
    }
    resolve(pagesText);
  } catch (error: any) {
    reject(error);
  }
};

export const getTextFromPdf = (file: File): Promise<string[][]> =>
  new Promise((resolve, reject) => {
    if (!file || file.type !== "application/pdf") {
      reject();
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      processDataUrl(reader.result as string, resolve, reject);
    reader.onerror = reject;
  });
