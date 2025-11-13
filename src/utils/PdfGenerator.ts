// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { PDFDocument } from "pdf-lib";
// import { saveAs } from "file-saver";

// // Define the form data interface
// interface FormData {
//   organization: string;
//   scope: string;
//   observationPeriod: string;
//   // We can add more fields here if needed, e.g., for the tables
// }

// // --- HELPER FUNCTIONS ---

// const addHeader = (doc: jsPDF) => {
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(10);
//   doc.text("REACH ISO", 15, 15);
//   doc.line(15, 17, 195, 17); // Horizontal line
// };

// const addFooter = (doc: jsPDF, pageNum: number) => {
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.text("www.reachiso.com", 15, 285);
//   doc.text("Confidential", 105, 285, { align: "center" });
//   doc.text(`${pageNum}`, 195, 285, { align: "right" });
// };

// // Helper to add a new page with headers and footers
// const addNewPage = (doc: jsPDF, pageNum: number) => {
//   doc.addPage();
//   addHeader(doc);
//   addFooter(doc, pageNum);
//   return pageNum + 1;
// };

// // Helper to add wrapped text with a margin
// const addWrappedText = (doc: jsPDF, text: string, options: { y: number, x?: number, isBold?: boolean, fontSize?: number }) => {
//   let { y, x = 15, isBold = false, fontSize = 10 } = options;
//   doc.setFont("helvetica", isBold ? "bold" : "normal");
//   doc.setFontSize(fontSize);
//   const lines = doc.splitTextToSize(text, 180); // 180mm width
//   doc.text(lines, x, y);
//   return y + (lines.length * (fontSize * 0.35)); // Return new Y position
// };

// const iseDevMode = true;

// // --- MAIN PDF GENERATION LOGIC ---

// export const generateFinalPDF = async (formData: FormData, userFile: File): Promise<string> => {
//   const doc = new jsPDF("p", "mm", "a4");
//   let pageNum = 1;

//   const { organization, scope, observationPeriod } = formData;
//   const applicableTSCs = "Security, Availability, and Confidentiality"; // Hardcoded from template, could be a form field

//   // --- PAGE 1: COVER PAGE (Based on Template Page 3 / Screenshot) ---
  
//   // Top Header
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(14);
//   doc.text("BLUE SANTOS", 17, 20);
//   doc.text("TECHNOLOGIES", 15, 26);

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(10);
//   doc.text("Email Us", 190, 20, { align: "right" });
//   doc.text("Info@reachiso.com", 190, 26, { align: "right" });

//   // Top Divider Line
//   doc.setDrawColor(0, 0, 0);
//   doc.line(17, 38, 190, 38); // x1, y1, x2, y2

//   // Main Content - All left-aligned
//   let currentY = 70;
//   doc.setFont("Quan Rounded SemiLight", "normal");
//   doc.setFontSize(22);
//   doc.text("SOC 2 Type 2 Report", 15, currentY);

//   currentY += 25; // Space for <service organization's logo>
//   // We'll just add the text for now
//   doc.setFontSize(14);
//   doc.text(organization, 15, currentY);

//   currentY += 15;
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "normal");
//   doc.text(`System and Organization Controls (SOC) 2 Type 2 Report for`, 15, currentY);
  
//   currentY += 7;
//   doc.setFont("helvetica", "bold");
//   doc.text(scope, 15, currentY);

//   currentY += 12;
//   doc.setFont("helvetica", "normal");
//   doc.text(`And the Suitability of Design of Controls Placed in Operation and Test of Operating Effectiveness`, 15, currentY);
//   currentY += 7;
//   doc.text(`Relevant to ${applicableTSCs}`, 15, currentY);

//   currentY += 12;
//   doc.setFont("helvetica", "bold");
//   doc.text("FOR THE OBSERVATION PERIOD", 15, currentY);
//   currentY += 7;
//   doc.text(observationPeriod, 15, currentY);

//   currentY += 12;
//   doc.setFont("helvetica", "normal");
//   doc.text("Together with Independent Service Auditors' Report", 15, currentY);

//   // Bottom "REACH ISO" Block
//   currentY = 250;
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(14);
//   doc.text("REACH ISO", 15, currentY);
//   doc.setFontSize(10);
//   doc.setFont("helvetica", "normal");
//   doc.text("A division of Blue Santos Technologies Pvt. Ltd.", 15, currentY + 6);

//   // Bottom Divider Line
//   doc.line(15, 275, 195, 275);
  
//   // Footer
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(10);
//   doc.text("www.reachiso.com", 15, 285);
//   doc.setFont("helvetica", "bold");
//   doc.text("Confidential", 195, 285, { align: "right" });


//   // --- PAGE 2: TABLE OF CONTENTS (Based on Template Page 4) ---
//   pageNum = addNewPage(doc, pageNum);
//   // Fixed: Removed 'let' to re-assign the existing variable instead of re-declaring it.
//   currentY = 40;
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(16);
//   doc.text("TABLE OF CONTENTS", 105, currentY, { align: "center" });
//   currentY += 20;

//   autoTable(doc, {
//     startY: currentY,
//     theme: "plain",
//     body: [
//       ["SECTION 1 INDEPENDENT SERVICE AUDITOR'S REPORT.", "1"],
//       ["SECTION 2 MANAGEMENT'S ASSERTION.", "6"],
//       ["SECTION 3 DESCRIPTION OF THE SYSTEM.", "9"],
//       ["SECTION 4 TESTING MATRICES", "XX"],
//     ],
//     styles: {
//       font: "helvetica",
//       fontSize: 12,
//     },
//     columnStyles: {
//       0: { cellWidth: 160 },
//       1: { cellWidth: 20, halign: "right" },
//     },
//     didDrawCell: (data) => {
//       if (data.column.index === 0 && data.cell.section === 'body') {
//         doc.setLineDash([0, 0], 0);
//       }
//     }
//   });


//   // --- PAGE 3: SECTION 1 TITLE (Based on Template Page 5) ---
//   pageNum = addNewPage(doc, pageNum);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(16);
//   doc.text("SECTION 1", 105, 140, { align: "center" });
//   doc.text("INDEPENDENT SERVICE AUDITOR'S REPORT", 105, 148, { align: "center" });


//   // --- PAGE 4: SECTION 1 CONTENT (Based on Template Page 6) ---
//   pageNum = addNewPage(doc, pageNum);
//   currentY = 40;
//   currentY = addWrappedText(doc, "Independent Service Auditor's Report for the Security, Availability, and Confidentiality.", { y: currentY, isBold: true });
//   currentY += 10;
//   currentY = addWrappedText(doc, `To\n${organization}`, { y: currentY });
//   currentY += 10;
//   currentY = addWrappedText(doc, "Scope", { y: currentY, isBold: true });
//   currentY += 5;
//   currentY = addWrappedText(doc, `We have examined the accompanying "Description of ${organization}'s ${scope}" for period ${observationPeriod} (the Description), based on the criteria for a description of a service organization's system set forth in DC Section 200, 2018 Description Criteria for a Description of a Service Organization's System in a SOC 2® Report ("description criteria"), and the suitability of the design and operating effectiveness of controls stated in the description for period ${observationPeriod} to provide reasonable assurance that ${organization}'s service commitments and system requirements were achieved based on the trust services criteria relevant to ${applicableTSCs} ("applicable trust services criteria") set forth in TSP Section 100, 2017 Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy.`, { y: currentY });
//   currentY += 5;
//   // ... This would continue for all the text on pages 6-9
//   // For brevity, I am stopping here. You would add more `addWrappedText` calls.
//   currentY = addWrappedText(doc, "[... Remainder of Section 1 text from pages 6-9 would go here ...]", { y: currentY });


//   // --- PAGE 5: SECTION 2 TITLE (Based on Template Page 10) ---
//   pageNum = addNewPage(doc, pageNum);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(16);
//   doc.text("SECTION 2", 105, 140, { align: "center" });
//   doc.text("MANAGEMENT'S ASSERTION", 105, 148, { align: "center" });


//   // --- PAGE 6: SECTION 2 CONTENT (Based on Template Page 11) ---
//   pageNum = addNewPage(doc, pageNum);
//   currentY = 40;
//   currentY = addWrappedText(doc, "MANAGEMENT'S ASSERTION", { y: currentY, isBold: true, fontSize: 14 });
//   currentY += 5;
//   currentY = addWrappedText(doc, `${organization}'s Management Assertion for period ${observationPeriod}`, { y: currentY, isBold: true });
//   currentY += 10;
//   currentY = addWrappedText(doc, `We have prepared the attached description titled "Description of ${organization}'s ${scope}" for period ${observationPeriod}. (the description), based on the criteria in items (a) (i)-(ii) below...`, { y: currentY });
//   currentY += 5;
//   // ... This would continue for all the text on pages 11-12
//   currentY = addWrappedText(doc, "[... Remainder of Section 2 text from pages 11-12 would go here ...]", { y: currentY });


//   // --- PAGE 7: SECTION 3 TITLE (Based on Template Page 13) ---
//   // This is the page *before* we insert the user's uploaded file
//   pageNum = addNewPage(doc, pageNum);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(16);
//   doc.text("SECTION 3", 105, 140, { align: "center" });
//   doc.text("DESCRIPTION OF THE SYSTEM", 105, 148, { align: "center" });
  
//   // Save the generated part of the document
//   const generatedBuffer = doc.output("arraybuffer");
//   const section3InsertPage = doc.internal.getNumberOfPages();

//   // --- MERGE USER'S UPLOADED PDF (Section 3 Content) ---
//   const [mainDoc, userDoc] = await Promise.all([
//     PDFDocument.load(generatedBuffer),
//     PDFDocument.load(await userFile.arrayBuffer()),
//   ]);

//   const userPages = await mainDoc.copyPages(userDoc, userDoc.getPageIndices());
  
//   // Insert pages one by one at the correct location
//   let insertPageIndex = section3InsertPage;
//   for (const userPage of userPages) {
//     // We insert the page at the correct index, rather than adding and moving
//     mainDoc.insertPage(insertPageIndex, userPage);
//     insertPageIndex++;
//   }

//   // --- CONTINUE GENERATING *AFTER* THE MERGE ---
  
//   // We must now use a *new* jsPDF doc for the remaining sections,
//   // as we cannot add pages to the `mainDoc` with jsPDF.
//   const finalSectionsDoc = new jsPDF("p", "mm", "a4");
//   let finalPageNum = section3InsertPage + userPages.length; // Start numbering from where we left off

//   // --- PAGE 8 (etc.): SECTION 4 TITLE (Based on Template Page 15) ---
//   addHeader(finalSectionsDoc);
//   addFooter(finalSectionsDoc, finalPageNum);
//   finalPageNum++;
//   finalSectionsDoc.setFont("helvetica", "bold");
//   finalSectionsDoc.setFontSize(16);
//   finalSectionsDoc.text("SECTION 4", 105, 140, { align: "center" });
//   finalSectionsDoc.text("TESTING MATRICES", 105, 148, { align: "center" });

  
//   // --- PAGE 9 (etc.): SECTION 4 TABLES (Based on Template Page 18) ---
//   addNewPage(finalSectionsDoc, finalPageNum); // Note: addNewPage doesn't return the incremented value here
//   finalSectionsDoc.setFont("helvetica", "bold");
//   finalSectionsDoc.setFontSize(14);
//   finalSectionsDoc.text("SECURITY PRINCIPLE AND CRITERIA TABLE", 15, 40);

//   autoTable(finalSectionsDoc, {
//     startY: 50,
//     head: [["Control #", "Control Activity Specified by the Service Organization", "Test Applied by the Service Auditor", "Test Results"]],
//     body: [
//       [{ content: "CC1.0: CONTROL ENVIRONMENT", colSpan: 4, styles: { fontStyle: 'bold' } }],
//       [{ content: "CC1.1: COSO Principle 1: The entity demonstrates a commitment to integrity and ethical values.", colSpan: 4, styles: { fontStyle: 'bold' } }],
//       ["CC1.1.1", "The entity has a formal Code of Conduct...", "Inquiry, Inspection", "No exceptions noted"],
//       // ... more rows ...
//     ],
//     theme: "grid",
//     headStyles: { fillColor: [220, 220, 220], textColor: 0, fontStyle: 'bold' },
//     styles: {
//       font: "helvetica",
//       fontSize: 9,
//       cellPadding: 2,
//     },
//     columnStyles: {
//       0: { cellWidth: 20 },
//       1: { cellWidth: 70 },
//       2: { cellWidth: 50 },
//       3: { cellWidth: 40 },
//     }
//   });

//   // ... You would add more tables for Availability, Confidentiality, etc.
  
//   // Get the buffer for this final part
//   const finalSectionsBuffer = finalSectionsDoc.output("arraybuffer");
//   const finalSectionsPdf = await PDFDocument.load(finalSectionsBuffer);
  
//   // Merge the final sections into the main document
//   const finalPages = await mainDoc.copyPages(finalSectionsPdf, finalSectionsPdf.getPageIndices());
//   finalPages.forEach(page => mainDoc.addPage(page));

//   // --- SAVE THE FINAL MERGED DOCUMENT ---
//   // Renumber all pages in the final document
//   const totalPages = mainDoc.getPageCount();
//   const font = await mainDoc.embedFont("Helvetica");
//   for (let i = 0; i < totalPages; i++) {
//     const page = mainDoc.getPage(i);
//     const { width, height } = page.getSize();
    
//     // Don't add a footer to the cover page
//     if (i === 0) continue;

//     // Redraw footers to ensure correct page numbers
//     page.drawText(`www.reachiso.com`, { x: 15 * (width/210), y: 12 * (height/297), size: 9, font: font });
//     page.drawText(`Confidential`, { x: 105 * (width/210), y: 12 * (height/297), size: 9, font: font, hAlign: 'center' });
//     page.drawText(`${i + 1}`, { x: 195 * (width/210), y: 12 * (height/297), size: 9, font: font, hAlign: 'right' });
//   }


//   // const finalBytes = await mainDoc.save();
//   // // saveAs(new Blob([finalBytes], { type: "application/pdf" }), "SOC2_Final_Report.pdf");
//   // const blob = new Blob([finalBytes], { type: "application/pdf" });
//   // const pdfUrl = URL.createObjectURL(blob);
//   // // window.open(pdfUrl); // opens in a new tab
//   // return pdfUrl;


//   if(iseDevMode) {
//       const finalBytes = await mainDoc.save();
//   const blob = new Blob([finalBytes], { type: "application/pdf" });
//   const blobUrl = URL.createObjectURL(blob);
//   return blobUrl;

//   } else {
//     const finalBytes = await mainDoc.save();
//     saveAs(new Blob([finalBytes], { type: "application/pdf" }), "SOC2_Final_Report.pdf");
//   }


// };



import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

// Define form data interface
interface FormData {
  organization: string;
  scope: string;
  observationPeriod: string;
}

// --- Helper functions ---

const addHeader = (doc: jsPDF) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("REACH ISO", 15, 15);
  doc.line(15, 17, 195, 17);
};

const addFooter = (doc: jsPDF, pageNum: number) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("www.reachiso.com", 15, 285);
  doc.text("Confidential", 105, 285, { align: "center" });
  doc.text(`${pageNum}`, 195, 285, { align: "right" });
};

const addNewPage = (doc: jsPDF, pageNum: number) => {
  doc.addPage();
  addHeader(doc);
  addFooter(doc, pageNum);
  return pageNum + 1;
};

const addWrappedText = (
  doc: jsPDF,
  text: string,
  options: { y: number; x?: number; isBold?: boolean; fontSize?: number }
) => {
  let { y, x = 15, isBold = false, fontSize = 10 } = options;
  doc.setFont("helvetica", isBold ? "bold" : "normal");
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, x, y);
  return y + lines.length * (fontSize * 0.35);
};

// --- Main generation ---
const isDevMode = true;

export const generateFinalPDF = async (
  formData: FormData,
  userFile?: File
): Promise<string> => {
  const doc = new jsPDF("p", "mm", "a4");
  let pageNum = 1;

  const { organization, scope, observationPeriod } = formData;
  const applicableTSCs =
    "Security, Availability, and Confidentiality";

  // --- PAGE 1: Cover Page ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("BLUE SANTOS", 17, 15);
  doc.text("TECHNOLOGIES", 17, 21);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Email Us", 174, 15, { align: "right" });
  doc.text("Info@reachiso.com", 190, 21, { align: "right" });

  doc.line(17, 30, 190, 30);
  let currentY = 50;
  doc.setFontSize(22);
  doc.text("SOC 2 Type 2 Report", 17, currentY);
  currentY += 25;
  doc.setFontSize(14);
  doc.text(organization, 17, currentY);
  currentY += 25;
  doc.setFontSize(14);
  doc.text(organization, 17, currentY);
  currentY += 15;
  doc.setFontSize(12);
  doc.text(`System and Organization Controls (SOC) 2 Type 2 Report for`, 17, currentY);
  currentY += 12;
  doc.setFont("helvetica", "bold");
  doc.text(scope, 17, currentY);
  currentY += 12;
  doc.setFont("helvetica", "normal");
  doc.text(
    `And the Suitability of Design of Controls Placed in Operation and Test of Operating Effectiveness`,
    17,
    currentY
  );
  currentY += 7;
  doc.text(`Relevant to ${applicableTSCs}`, 17, currentY);
  currentY += 16;
  doc.setFont("helvetica", "bold");
  doc.text("FOR THE OBSERVATION PERIOD", 17, currentY);
  currentY += 10;
  doc.text(observationPeriod, 17, currentY);
  currentY += 18;
  doc.setFont("helvetica", "normal");
  doc.text("Together with Independent Service Auditors' Report", 17, currentY);

  currentY = 250;
  doc.setFont("Quan Rounded SemiLight", "normal");
  doc.setFontSize(14);
  doc.text("REACH ISO", 17, currentY);
  doc.setFontSize(10);
  doc.text("A division of Blue Santos Technologies Pvt. Ltd.", 17, currentY + 6);
  doc.line(17, 275, 195, 275);
  doc.setFontSize(10);
  doc.text("www.reachiso.com", 17, 285);
  doc.setFont("helvetica", "normal");
  doc.text("Confidential", 195, 285, { align: "right" });

  // --- PAGE 2: TOC ---
  pageNum = addNewPage(doc, pageNum);
  currentY = 40;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("TABLE OF CONTENTS", 105, currentY, { align: "center" });
  currentY += 20;

  autoTable(doc, {
    startY: currentY,
    theme: "plain",
    body: [
      ["SECTION 1 INDEPENDENT SERVICE AUDITOR'S REPORT.", "1"],
      ["SECTION 2 MANAGEMENT'S ASSERTION.", "6"],
      ["SECTION 3 DESCRIPTION OF THE SYSTEM.", "9"],
      ["SECTION 4 TESTING MATRICES", "XX"],
    ],
    styles: {
      font: "helvetica",
      fontSize: 12,
    },
    columnStyles: {
      0: { cellWidth: 160 },
      1: { cellWidth: 20, halign: "right" },
    },
  });

  // --- PAGE 3–7: Sample content pages ---
  pageNum = addNewPage(doc, pageNum);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SECTION 1", 105, 140, { align: "center" });
  doc.text("INDEPENDENT SERVICE AUDITOR'S REPORT", 105, 148, { align: "center" });

  pageNum = addNewPage(doc, pageNum);
  currentY = 40;
  currentY = addWrappedText(doc, "Independent Service Auditor's Report ...", { y: currentY, isBold: true });
  currentY += 10;
  currentY = addWrappedText(doc, `To\n${organization}`, { y: currentY });

  pageNum = addNewPage(doc, pageNum);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SECTION 2", 105, 140, { align: "center" });
  doc.text("MANAGEMENT'S ASSERTION", 105, 148, { align: "center" });

  pageNum = addNewPage(doc, pageNum);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SECTION 3", 105, 140, { align: "center" });
  doc.text("DESCRIPTION OF THE SYSTEM", 105, 148, { align: "center" });

  // --- Save generated portion ---
  const generatedBuffer = doc.output("arraybuffer");

  let mainDoc: PDFDocument;
  try {
    mainDoc = await PDFDocument.load(generatedBuffer);
  } catch (err) {
    console.error("Error loading generated PDF:", err);
    throw new Error("Failed to load generated PDF document.");
  }

  // --- MERGE USER FILE if valid ---
  let shouldMerge = false;
  if (userFile && userFile.size > 0) {
    try {
      const userPdf = await PDFDocument.load(await userFile.arrayBuffer());
      const userPages = await mainDoc.copyPages(userPdf, userPdf.getPageIndices());
      userPages.forEach((p) => mainDoc.addPage(p));
      shouldMerge = true;
      console.log("✅ Merged user PDF successfully.");
    } catch (err) {
      console.warn("⚠️ Skipping merge: invalid or unreadable PDF file.", err);
      shouldMerge = false;
    }
  } else {
    console.log("⚠️ No user PDF provided, skipping merge.");
  }

  // --- Add remaining final pages ---
  const finalSectionsDoc = new jsPDF("p", "mm", "a4");
  addHeader(finalSectionsDoc);
  addFooter(finalSectionsDoc, 1);
  finalSectionsDoc.setFont("helvetica", "bold");
  finalSectionsDoc.setFontSize(16);
  finalSectionsDoc.text("SECTION 4", 105, 140, { align: "center" });
  finalSectionsDoc.text("TESTING MATRICES", 105, 148, { align: "center" });

  const finalSectionsBuffer = finalSectionsDoc.output("arraybuffer");
  const finalSectionsPdf = await PDFDocument.load(finalSectionsBuffer);
  const finalPages = await mainDoc.copyPages(finalSectionsPdf, finalSectionsPdf.getPageIndices());
  finalPages.forEach((p) => mainDoc.addPage(p));

  // --- Save result ---
  const finalBytes = await mainDoc.save();

  if (isDevMode) {
    const blob = new Blob([finalBytes], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  } else {
    saveAs(new Blob([finalBytes], { type: "application/pdf" }), "SOC2_Final_Report.pdf");
    return "downloaded";
  }
};
