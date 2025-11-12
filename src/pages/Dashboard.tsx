import { Card, Col, Row } from "antd"
import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="pt-20">
      <h2 className="text-2xl font-semibold mb-6">
        Dashboard
      </h2>
      <Row gutter={16}>
        <Col span={8}>
        <Card className="shadow-lg">Reports Generated: 14</Card>
        </Col>
        <Col span={8}>
        <Card className="shadow-lg">Reports Generated: 14</Card>
        </Col>
        <Col span={8}>
        <Card className="shadow-lg">Reports Generated: 14</Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard