import { jsPDF } from 'jspdf';

export async function downloadResume(): Promise<void> {
  const imageUrl = 'https://res.cloudinary.com/dxjhts59s/image/upload/f_auto,q_auto/1000013551_mmcszd?cb=' + Date.now();
  
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  return new Promise<void>((resolve, reject) => {
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        // A4 standard dimensions: 210mm x 297mm
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Raunak_Shrestha_Resume.pdf');
        resolve();
      } catch (err) {
        console.error('Failed to convert resume image to PDF:', err);
        // Fallback: direct download link
        const a = document.createElement('a');
        a.href = 'https://res.cloudinary.com/dxjhts59s/image/upload/f_auto,q_auto/1000013551_mmcszd';
        a.target = '_blank';
        a.download = 'Raunak_Shrestha_Resume.jpg';
        a.click();
        resolve();
      }
    };
    
    img.onerror = (err) => {
      console.error('Failed to load resume image for PDF generation:', err);
      // Fallback: direct download link
      const a = document.createElement('a');
      a.href = 'https://res.cloudinary.com/dxjhts59s/image/upload/f_auto,q_auto/1000013551_mmcszd';
      a.target = '_blank';
      a.download = 'Raunak_Shrestha_Resume.jpg';
      a.click();
      resolve();
    };
    
    img.src = imageUrl;
  });
}
