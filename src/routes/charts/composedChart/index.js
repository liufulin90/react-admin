import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Card, Button} from 'antd'
import Container from '../Container'
import {
  ComposedChart,
  Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'

const colProps = {
  lg: 12,
  md: 24,
}
const data = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
  {name: 'Page B', uv: 868, pv: 967, amt: 1506},
  {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
  {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
  {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
  {name: 'Page F', uv: 1400, pv: 680, amt: 1700}]
const chartMargin = {
  top: 5,
  right: 30,
  left: 20,
  bottom: 5,
}
const LineBarAreaComposedChart = () => (
  <Container>
    <ComposedChart data={data} margin={chartMargin}>
      <XAxis dataKey="name"/>
      <YAxis />
      <Tooltip/>
      <Legend/>
      <CartesianGrid stroke='#f5f5f5'/>
      <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
      <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
      <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
    </ComposedChart>
  </Container>
)
const VerticalComposedChart = () => (
  <Container>
    <ComposedChart layout="vertical" data={data} margin={chartMargin}>
      <XAxis type="number"/>
      <YAxis dataKey="name" type="category"/>
      <Tooltip/>
      <Legend/>
      <CartesianGrid stroke='#f5f5f5'/>
      <Area dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
      <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
      <Line dataKey='uv' stroke='#ff7300'/>
    </ComposedChart>
  </Container>
)
const SameDataComposedChart = () => (
  <Container>
    <ComposedChart data={data} margin={chartMargin}>
      <XAxis dataKey="name"/>
      <YAxis />
      <Tooltip/>
      <Legend/>
      <CartesianGrid stroke='#f5f5f5'/>
      <Area dataKey='pv' fill='#8884d8' stroke='#8884d8'/>
      <Bar dataKey='amt' barSize={20} fill='#413ea0'/>
      <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
    </ComposedChart>
  </Container>
)
const ComposedChartWithAxisLabels = () => (
  <Container>
    <ComposedChart data={data} margin={chartMargin}>
      <XAxis dataKey="name" label="Pages"/>
      <YAxis label="Index"/>
      <Tooltip/>
      <Legend/>
      <CartesianGrid stroke='#f5f5f5'/>
      <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
      <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
      <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
    </ComposedChart>
  </Container>
)
const EditorPage = () => (
  <div className="content-inner">
    <Row gutter={32}>
      <Col {...colProps}>
        <Card title="LineBarAreaComposedChart">
          <LineBarAreaComposedChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="VerticalComposedChart">
          <VerticalComposedChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="SameDataComposedChart">
          <SameDataComposedChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="ComposedChartWithAxisLabels">
          <ComposedChartWithAxisLabels />
        </Card>
      </Col>
    </Row>
  </div>
)

export default EditorPage
