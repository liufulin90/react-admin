import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Card, Button} from 'antd'
import Container from '../Container'
import {
  PieChart, Pie, Sector, Cell, Legend
} from 'recharts'

const colProps = {
  lg: 12,
  md: 24,
}
const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]

const data02 = [{name: 'A1', value: 100},
  {name: 'A2', value: 300},
  {name: 'B1', value: 100},
  {name: 'B2', value: 80},
  {name: 'B3', value: 40},
  {name: 'B4', value: 30},
  {name: 'B5', value: 50},
  {name: 'C1', value: 100},
  {name: 'C2', value: 200},
  {name: 'D1', value: 150},
  {name: 'D2', value: 50}]
const chartMargin = {
  top: 5,
  right: 30,
  left: 20,
  bottom: 5,
}
const TwoLevelPieChart = () => (
  <Container>
    <PieChart>
      <Pie data={data01} outerRadius={60} fill="#8884d8"/>
      <Pie data={data02} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
    </PieChart>
  </Container>
)
const StraightAnglePieChart = () => (
  <Container>
    <PieChart >
      <Pie cy={180} startAngle={180} endAngle={0} data={data02} outerRadius={110} fill="#8884d8" label/>
    </PieChart>
  </Container>
)

// ======================
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const data = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200}];
/////////// PieChartWithCustomizedLabel begin
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const COLORS2 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
class PieChartWithCustomizedLabel extends React.Component {
  constructor (props) {
    super(props)
  }
  onPieEnter () {

  }
  render () {
    return (
      <Container>
        <PieChart onMouseEnter={this.onPieEnter}>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell fill={COLORS2[index % COLORS2.length]}/>)
            }
          </Pie>
        </PieChart>
      </Container>
    )
  }
}

/////////// PieChartWithCustomizedLabel end

/////////////// CustomActiveShapePieChart begin
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class CustomActiveShapePieChart extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
  }
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    })
  }
  render () {
    return (
      <Container>
        <PieChart onMouseEnter={this.onPieEnter}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={70}
            outerRadius={80}
            fill="#8884d8"/>
        </PieChart>
      </Container>
    )
  }
}
/////////////// CustomActiveShapePieChart end
//  <a href="http://recharts.org/#/en-US/examples/TinyBarChart" target="blank">Show More</a>
const EditorPage = () => (
  <div className="content-inner">
    <Row gutter={32}>
      <Col {...colProps}>
        <Card title="TwoLevelPieChart">
          <TwoLevelPieChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="StraightAnglePieChart">
          <StraightAnglePieChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="PieChartWithCustomizedLabel">
          <PieChartWithCustomizedLabel />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="CustomActiveShapePieChart">
          <CustomActiveShapePieChart />
        </Card>
      </Col>
    </Row>
  </div>
)

export default EditorPage
