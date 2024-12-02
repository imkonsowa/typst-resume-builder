import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async () => {
  const element = document.getElementById('resume-preview');
  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('resume.pdf');
};