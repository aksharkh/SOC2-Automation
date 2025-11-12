import { Button, Card, Form, Input, message, Upload } from "antd";
import React, { useState } from 'react'
import { TiUploadOutline } from "react-icons/ti";


interface FormValues {
    organization: string;
    scope: string;
    observationPeriod: string;
}

const PdfForm: React.FC = () => {


  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<FormValues>();

  const beforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  const onFinish = async (values: FormValues) => {
    if(!file) {
      message.error("Please upload the reference PDF");
      return;
    }

    setLoading(true);
    try {
      
      
    } catch (error) {
      console.error(error);
      message.error("Error generating PDF");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pt-20">
      <Card>
        <h2 className="text-2xl font-semibold text-center mb-4">Generate SOC 2 Report</h2>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="organization" label="Organization" rules={[{ required: true}]}>
            <Input type="text" placeholder="Organization Name" />
          </Form.Item>

          <Form.Item name="scope" label="Scope" rules={[{ required: true}]}>
            <Input type="text" placeholder="Report Scope" />
          </Form.Item>

          <Form.Item name="observationPeriod" label="Observatiopn Period" rules={[{ required: true}]}>
            <Input type="text" placeholder="e.g., Jan 2024 - Dec 2024" />
          </Form.Item>

          <Form.Item label="Upload Reference PDF" rules={[{ required: true}]}>
            <Upload beforeUpload={beforeUpload} maxCount={1} accept="application/pdf">
            <Button icon={<TiUploadOutline />}> Select PDF</Button>

            </Upload>
            {/* {file && <div className="mt-2 text-gray-500 text-sm"> File: {file.name}</div>} */}

          </Form.Item>

          <div className="flex justify-center">
            <Button type="primary" htmlType="submit" loading={loading}>
              Generate & download
            </Button>

          </div>

        </Form>
      </Card>
    </div>
  )
}

export default PdfForm