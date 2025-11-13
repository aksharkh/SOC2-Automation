import React, { useEffect, useState } from "react";
import { Card, message, Spin } from "antd";

const PreviewPage: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timestamp, setTimestamp] = useState<string>("");

  // ✅ Hardcoded dev data
  const [formData] = useState({
    organization: "Blue Santos Technologies",
    scope: "Cloud Security Services",
    observationPeriod: "Jan–Dec 2025",
  });

  const generatePDF = async () => {
    setLoading(true);
    try {
      // ✅ Dynamically import always-latest PdfGenerator
      const { generateFinalPDF } = await import("../utils/PdfGenerator");

      // Placeholder file (merge later)
      const emptyFile = new File([new Blob()], "placeholder.pdf", {
        type: "application/pdf",
      });

      const url = await generateFinalPDF(formData, emptyFile);
      setPdfUrl(url);
      setTimestamp(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error);
      message.error("Error generating PDF");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Regenerate whenever code changes (Vite HMR will reload module)
  useEffect(() => {
    generatePDF();
  }, []);

  return (
    <div className="pt-20 px-8">
      <Card>
        <h2 className="text-2xl font-semibold text-center mb-6">
          SOC 2 Report Live Preview (Auto Refresh)
        </h2>

        <div className="space-y-2 mb-4 text-center">
          <p>
            <strong>Organization:</strong> {formData.organization}
          </p>
          <p>
            <strong>Scope:</strong> {formData.scope}
          </p>
          <p>
            <strong>Observation Period:</strong> {formData.observationPeriod}
          </p>
          {timestamp && (
            <p className="text-gray-500 text-sm">
              Last updated: {timestamp}
            </p>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <Spin size="large" />
          </div>
        )}
      </Card>

      {/* --- PDF Preview --- */}
      {pdfUrl && !loading && (
        <div className="mt-10 border rounded-md shadow-lg overflow-hidden">
          <iframe
            src={pdfUrl}
            width="100%"
            height="800px"
            title="PDF Preview"
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
