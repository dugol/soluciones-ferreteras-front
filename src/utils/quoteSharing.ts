import { getQuoteFileName } from './pdfQuoteGenerator';

export function canShareFiles(): boolean {
  if (!navigator.canShare) return false;
  try {
    const testFile = new File([], 'test.pdf', { type: 'application/pdf' });
    return navigator.canShare({ files: [testFile] });
  } catch {
    return false;
  }
}

export function downloadPDF(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getQuoteFileName();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function sharePDF(blob: Blob): Promise<boolean> {
  const file = new File([blob], getQuoteFileName(), { type: 'application/pdf' });

  try {
    await navigator.share({ files: [file] });
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      // User cancelled — not an error
      return false;
    }
    // Share failed — fallback to download
    downloadPDF(blob);
    return true;
  }
}
