import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { Row, Col, Card } from 'antd'
import {EChartsClock} from '../../../components/EchartsContainer'
import GaugeCarDark from '../../Dashboard/components/gaugeCarDark'
import Wraper from '../../../components/Widgets/Wraper'

const colProps = {
  lg: 12,
  md: 24,
}

const EditorPage = ({dashboard}) => {
  // console.log(dashboard)
  const {carData} = dashboard
  return (
    <div className="content-inner">
      <Wraper>
        <div>11 我可以拖拽</div>
      </Wraper>
      <Wraper>
        <div>22</div>
      </Wraper>
      <Wraper>
        <div>33</div>
      </Wraper>
      <Wraper>
        <div>44</div>
      </Wraper>
      <Wraper>
        <div>55</div>
      </Wraper>
      <Wraper>
        <div>66</div>
      </Wraper>
      <Wraper>
        <div>77</div>
      </Wraper>
      <Wraper>
        <div>88</div>
      </Wraper>
      <Wraper>
        <GaugeCarDark data={carData}/>
      </Wraper>
      <Wraper ratio={1}>
        <EChartsClock />
      </Wraper>
    </div>
  )
}

Dashboard.propTypes = {
  carData: PropTypes.object
}
export default connect(({dashboard}) => ({dashboard}))(EditorPage)
