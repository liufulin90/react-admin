import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { Row, Col, Card } from 'antd'
import {EChartsClock} from '../../../components/EchartsContainer'
import GaugeCarDark from '../../Dashboard/components/gaugeCarDark'

const colProps = {
  lg: 12,
  md: 24,
}

const EditorPage = ({dashboard}) => {
  console.log(dashboard)
  const {carData} = dashboard
  return (
    <div className="content-inner">
      <Row gutter={32}>
        <Col {...colProps}>
          <Card title="EChart Clock">
            <EChartsClock />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="EChart Clock">
            <GaugeCarDark data={carData}/>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Dashboard.propTypes = {
  carData: PropTypes.object
}
export default connect(({dashboard}) => ({dashboard}))(EditorPage)
