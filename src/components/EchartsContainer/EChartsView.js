import React, { Component, PropTypes } from 'react';
import echarts from 'echarts';

/**
 * echarts展示的主体部分
 */
class EChartsView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartId: new Date().getTime()
    }
  }
  componentWillMount() {
  }

  /**
   * 初始化图表
   */
  initChart = (options) => {
    let {chartId} = this.state
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(chartId));
    // 绘制图表
    myChart.setOption(options);
  }
  componentDidMount() {
    let {options} = this.props
    this.initChart(options)

    window.addEventListener('resize', () => {
      this.initChart(options)
    })
  }
  componentWillReceiveProps() {
    let {options} = this.props
    this.initChart(options)
  }
  render() {
    let {chartId} = this.state
    let style = {
      height: '100%'
    }
    return(
      <div id={chartId} style={style}></div>
    )
  }
}

EChartsView.propTypes = {
  options: PropTypes.object
}

export default EChartsView