import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function createPDF() {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the document
  const page = pdfDoc.addPage([600, 800]);

  // Set up some fonts and colors
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const titleFontSize = 24;
  const textFontSize = 12;
  const titleColor = rgb(0, 0, 0.8);
  const textColor = rgb(0, 0, 0);

  // Add title
  page.drawText('JUAN JOSÉ MARTÍNEZ PÉREZ', {
    x: 50,
    y: 750,
    size: titleFontSize,
    font: timesRomanFont,
    color: titleColor,
  });

  page.drawText('Desarrollador de software & Diseñador UX/UI', {
    x: 50,
    y: 720,
    size: textFontSize,
    font: timesRomanFont,
    color: textColor,
  });

  // Add contact information
  const contactInfo = [
    '+34 658953262',
    'juanjomp85@gmail.com',
    'https://www.modesign.es',
    'Murcia',
  ];

  contactInfo.forEach((text, idx) => {
    page.drawText(text, {
      x: 50,
      y: 700 - idx * 20,
      size: textFontSize,
      font: timesRomanFont,
      color: textColor,
    });
  });

  // Add presentation
  const presentation = `Soy un desarrollador de software apasionado por la tecnología, con un interés especial en el rock y el baloncesto.
  
La tecnología es mi entorno natural y las líneas de código son mi forma de expresión. A lo largo de mi carrera, he trabajado no solo en el desarrollo de software, sino también en la implementación de soluciones creativas que van más allá de la mera funcionalidad.
  
Me esfuerzo por combinar el rigor técnico con un enfoque creativo en el diseño UX/UI, porque creo firmemente que el código y el diseño pueden y deben coexistir armoniosamente.
  
Me considero una persona amigable y sincera, con una fuerte capacidad para escuchar y empatizar. Estas cualidades me permiten comprender profundamente las emociones y necesidades de los usuarios finales, lo que se traduce en soluciones tecnológicas más efectivas y satisfactorias.
  
Estoy comprometido con el aprendizaje continuo y el crecimiento profesional. Siempre busco nuevos desafíos que me permitan ampliar mis horizontes y mejorar mis habilidades.
  
Mi objetivo es desarrollar un perfil profesional dinámico que integre mi pasión por la tecnología con la creatividad del diseño. Estoy emocionado por las oportunidades futuras, las conexiones que estableceré y el impacto que podremos lograr juntos.
  
¡Encantado de conocernos!
  
Por cierto, nací en Murcia y aquí sigo, disfrutando de las delicias locales como las marineras y los pasteles de carne.`;

  page.drawText(presentation, {
    x: 50,
    y: 600,
    size: textFontSize,
    font: timesRomanFont,
    color: textColor,
    lineHeight: 14,
    maxWidth: 500,
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Write the PDF to a file
  fs.writeFileSync('JuanJoseMartinezPerez.pdf', pdfBytes);
}

createPDF().catch((err) => console.log(err));
