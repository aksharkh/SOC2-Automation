import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";


interface FormData {
    organization: string;
    scope: string;
    observationPeriod: string;
}

export const generateFinalPDF = async (FormData: FormData, userFile: File ): Promise<void> => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("SOC 2 Report", 14, 20 );
    doc.setFontSize(12);
    doc.text(`Organization: ${FormData.organization}`, 14, 35);
    doc.text(`Scope: ${FormData.scope}`, 14, 45);
    doc.text(`Observation Period: ${FormData.observationPeriod}`, 14, 55);
    doc.text("Prepared by Reach ISO", 14, 65);

    for(let i =1; i<20; i++){
        doc.addPage();
        doc.text(`Section ${i+1}`, 14, 20);
        autoTable(doc, {
            startY: 30,
            head:[["Control ID" , "Description", "Result"]],
            body: [
                ["cc1.1", "Integrity & Ethics", "No exceptions noted"],
                ["cc1.2", "Integrity & Ethics", "No exceptions noted"],

            ],
            theme: "striped",
            headStyles: { fillColor: [59,130, 246]},
        });
    }

    const generatedBuffer = doc.output("arraybuffer");
    const [mainDoc, userDoc] = await Promise.all([
        PDFDocument.load(generatedBuffer),
        PDFDocument.load(await userFile.arrayBuffer()),
    ]);

    const userPages = await mainDoc.copyPages(userDoc, userDoc.getPageIndices());
    userPages.forEach((p) => mainDoc.addPage(p));

    const finalBytes = await mainDoc.save();
    saveAs(new Blob([finalBytes], { type: "application/pdf"}), "SOC2_Final_Report.pdf");

};