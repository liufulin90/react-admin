import React, { Component, PropTypes } from 'react';
import EchartsContainer from './Container'
import EChartsView from './EChartsView'

class EChartsClock extends Component {
  constructor (props) {
    super(props)
    //  使用要点：
//  1、应在id="main"的div中指定宽度和高度，在每个series[]中对center、radius应进行调整
//     或使用示例中getDom()进行设定
//  2、大表盘是由时、分、秒三个series[]数据项重叠构成
//  3、24小时、星期、月三个小表盘，以及日期，各自使用了一个series[]数据项
//  4、animation应设为0，避免指针归零是有“掉下来的感觉”
    this.state = {
      options : {
      tooltip: {
        formatter: "{a}：{c}"
      },
      //    backgroundColor: "rgba(200,250,250,0.5)",
      series: [{ ///////////////////////////////////////////////小表盘24小时
        name: '小时',
        type: 'gauge',
        center: ['28%', '50%'], // 默认全局居中
        radius: '22%', //仪表盘半径
        min: 0,
        max: 24,
        startAngle: 90,
        endAngle: -269.9999,
        splitNumber: 24,
        animation: 0,
        pointer: { //仪表盘指针
          show: 1,
          length: '90%',
          width: 3
        },
        itemStyle: { //仪表盘指针样式
          normal: {
            color: '#00b0b0',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        axisLine: { //仪表盘轴线样式
          lineStyle: {
            color: [
              [1, '#337ab7']
            ],
            width: 6
          }
        },
        splitLine: { //分割线样式
          length: 6,
          lineStyle: {
            width: 1
          }
        },
        axisTick: { //仪表盘刻度样式
          show: 0,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
            color: ['#ffffff']
          }
        },
        axisLabel: { //刻度标签
          show: 1,
          distance: 2, //标签与刻度线的距离
          textStyle: {
            color: '#0000ff',
            fontFamily: '宋体'
          },
          formatter: function(t) {
            switch (t + '') {
              case '0':
                return '';
              case '1':
                return '';
              case '2':
                return '';
              case '3':
                return '3';
              case '4':
                return '';
              case '5':
                return '';
              case '6':
                return '6';
              case '7':
                return '';
              case '8':
                return '';
              case '9':
                return '9';
              case '10':
                return '';
              case '11':
                return '';
              case '12':
                return '12';
              case '13':
                return '';
              case '14':
                return '';
              case '15':
                return '15';
              case '16':
                return '';
              case '17':
                return '';
              case '18':
                return '18';
              case '19':
                return '';
              case '20':
                return '';
              case '21':
                return '21';
              case '22':
                return '';
              case '23':
                return '';
              case '24':
                return '24';
            }
          }
        },
        title: { //仪表盘标题
          show: 1,
          offsetCenter: ['200%', '-210%'],
          textStyle: {
            color: '#a0a0a0',
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Arial'
          }
        },
        detail: { //仪表盘显示数据
          show: 0,
          formatter: '{value}',
          offsetCenter: [0, '60%']
        },
        data: [{
          name: 'Ω\nOMEGA'
        }]
      }, { ///////////////////////////////////////////////小表盘星期
        name: '星期',
        type: 'gauge',
        center: ['72%', '50%'], // 默认全局居中
        radius: '22%', //仪表盘半径
        min: 0,
        max: 7,
        startAngle: 90,
        endAngle: -269.9999,
        splitNumber: 7,
        animation: 0,
        pointer: { //仪表盘指针
          show: true,
          length: '80%',
          width: 3
        },
        itemStyle: { //仪表盘指针样式
          normal: {
            color: '#00b0b0',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        axisLine: { //仪表盘轴线样式
          lineStyle: {
            color: [
              [0.07, 'rgba(192, 0, 0, 0.5)'],
              [0.21, 'rgba(0, 0, 192, 0.5)'],
              [0.35, 'rgba(0, 64, 192, 0.5)'],
              [0.50, 'rgba(0, 96, 192, 0.5)'],
              [0.64, 'rgba(0, 164, 192, 0.5)'],
              [0.78, 'rgba(0, 128, 64, 0.5)'],
              [0.93, 'rgba(192, 128, 0, 0.5)'],
              [1, 'rgba(192, 0, 0, 0.5)']
            ],
            width: 18
          }
        },
        splitLine: { //分割线样式
          show: 0,
          length: 18,
          lineStyle: {
            width: 1
          }
        },
        axisTick: {
          show: 0
        }, //仪表盘刻度样式
        axisLabel: { //刻度标签
          show: 1,
          distance: -15, //标签与刻度线的距离
          textStyle: {
            color: '#ffffff'
          },
          formatter: function(t) {
            switch (t + '') {
              case '0':
                return '7';
              case '1':
                return '1';
              case '2':
                return '2';
              case '3':
                return '3';
              case '4':
                return '4';
              case '5':
                return '5';
              case '6':
                return '6';
            }
          }
        },
        title: {
          show: 0
        }, //仪表盘标题
        detail: {
          show: 0
        }, //仪表盘显示数据
        data: [{}]
      }, { ///////////////////////////////////////////////小表盘月
        name: '月份',
        type: 'gauge',
        center: ['50%', '72%'], // 默认全局居中
        radius: '22%', //仪表盘半径
        min: 0,
        max: 12,
        startAngle: 90,
        endAngle: -269.9999,
        splitNumber: 12,
        animation: 0,
        pointer: { //仪表盘指针
          show: 1,
          length: '90%',
          width: 3
        },
        itemStyle: { //仪表盘指针样式
          normal: {
            color: '#00b0b0',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        axisLine: { //仪表盘轴线样式
          lineStyle: {
            color: [
              [1, '#337ab7']
            ],
            width: 6
          }
        },
        splitLine: { //分割线样式
          show: 1,
          length: 6,
          lineStyle: {
            width: 1
          }
        },
        axisTick: {
          show: 0
        }, //仪表盘刻度样式
        axisLabel: { //刻度标签
          show: 1,
          distance: 1, //标签与刻度线的距离
          textStyle: {
            color: '#0000ff',
            fontFamily: '宋体'
          },
          formatter: function(t) {
            switch (t + '') {
              case '2':
                return '2';
              case '4':
                return '4';
              case '6':
                return '6';
              case '8':
                return '8';
              case '10':
                return '10';
              case '12':
                return '12';
            }
          }
        },
        detail: {
          show: 0
        }, //仪表盘显示数据
        data: [{}]
      }, { ///////////////////////////////////////////////小表盘日
        type: 'gauge',
        center: ['50%', '72%'], // 默认全局居中
        radius: '22%', //仪表盘半径
        animation: 0,
        pointer: {
          width: 0
        }, //仪表盘指针
        axisLine: { //仪表盘轴线样式
          lineStyle: {
            show: 0,
            width: 0
          }
        },
        splitLine: {
          show: 0
        }, //分割线样式
        axisTick: {
          show: 0
        }, //仪表盘刻度样式
        axisLabel: {
          show: 0
        }, //刻度标签
        detail: { //仪表盘显示数据
          show: 1,
          formatter: function(e) {
            if (e < 10)
              e = '0' + e;
            return e;
          },
          offsetCenter: ['160%', 0],
          borderWidth: 2,
          borderColor: '#337ab7',
          backgroundColor: '#A0A0A0',
          height: 20,
          width: 28,
          textStyle: {
            color: '#ffff00',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Arial'
          },
        },
        data: [{}]
      }, { ///////////////////////////////////////////////大表盘时针
        name: '小时',
        type: 'gauge',
        radius: '90%', //仪表盘半径
        min: 0,
        max: 12,
        startAngle: 90,
        endAngle: -269.9999,
        splitNumber: 12,
        animation: 0,
        pointer: { //仪表盘指针
          length: '70%',
          width: 6
        },
        itemStyle: { //仪表盘指针样式
          normal: {
            color: '#109A39',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        axisLine: { //仪表盘轴线样式
          show: 0,
          lineStyle: {
            color: [
              [1, '#337ab7']
            ],
            width: 10,
            shadowColor: 'rgba(0, 0, 0, 0.8)',
            shadowBlur: 12,
            shadowOffsetX: 3,
            shadowOffsetY: 3
          }
        },
        splitLine: { //分割线样式
          length: 10,
          lineStyle: {
            width: 2
          }
        },
        axisTick: { //仪表盘刻度样式
          show: true,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
            color: ['#ffffff']
          }
        },
        axisLabel: {
          show: 0
        }, //刻度标签
        title: {
          show: 0
        }, //仪表盘标题
        detail: {
          show: 0
        }, //仪表盘显示数据
        data: [{}]
      }, { ///////////////////////////////////////////////大表盘分针
        name: '分钟',
        type: 'gauge',
        radius: '90%', //仪表盘半径
        min: 0,
        max: 12,
        startAngle: 90,
        endAngle: -269.9999,
        splitNumber: 12,
        animation: 0,
        pointer: { //仪表盘指针
          length: '85%',
          width: 6
        },
        itemStyle: { //仪表盘指针样式
          normal: {
            color: '#ca8622',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        axisLine: { //仪表盘轴线样式
          show: 0,
          lineStyle: {
            width: 0
          }
        },
        splitLine: { //分割线样式
          length: 10,
          lineStyle: {
            width: 2
          }
        },
        axisTick: { //仪表盘刻度样式
          show: true,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
            color: ['#ffffff']
          }
        },
        axisLabel: {
          show: 0
        }, //刻度标签
        title: {
          show: 0
        }, //仪表盘标题
        detail: {
          show: 0
        }, //仪表盘显示数据
        data: [{}]
      }, { ///////////////////////////////////////////////大表盘秒针
        name: '秒',
        type: 'gauge',
        radius: '90%', //仪表盘半径
        min: 0,
        max: 60,
        startAngle: 90,
        endAngle: -269.9999,
        splitNumber: 12,
        animation: 0,
        pointer: { //仪表盘指针
          show: true,
          length: '95%',
          width: 4
        },
        itemStyle: { //仪表盘指针样式
          normal: {
            color: '#00b0b0',
            shadowColor: 'rgba(0, 0, 0, 0.8)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4
          }
        },
        axisLine: { //仪表盘轴线样式
          lineStyle: {
            color: [
              [1, '#337ab7']
            ],
            width: 10
          }
        },
        splitLine: { //分割线样式
          length: 10,
          lineStyle: {
            width: 2
          }
        },
        axisTick: { //仪表盘刻度样式
          show: 1,
          splitNumber: 5, //分隔线之间分割的刻度数
          length: 5, //刻度线长
          lineStyle: {
            color: ['#fff']
          }
        },
        axisLabel: { //刻度标签
          show: 1,
          distance: 6, //标签与刻度线的距离
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16
          },
          formatter: function(t) {
            switch (t + '') {
              case '0':
                return '';
              case '5':
                return '1';
              case '10':
                return '2';
              case '15':
                return '3';
              case '20':
                return '4';
              case '25':
                return '5';
              case '30':
                return '6';
              case '35':
                return '7';
              case '40':
                return '8';
              case '45':
                return '9';
              case '50':
                return '10';
              case '55':
                return '11';
              case '60':
                return '12';
            }
          }
        },
        title: {
          show: 0
        }, //仪表盘标题
        detail: { //仪表盘显示数据
          show: 0,
          formatter: '{value}',
          offsetCenter: [0, '60%']
        },
        data: [{}]
      }]
    }
    }
  }

  /**
   * 获取日期信息
   */
  getDateInfo = () => {
    let datetime = new Date();
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1;
    let date = datetime.getDate();
    let h = datetime.getHours();
    let m = datetime.getMinutes();
    let s = datetime.getSeconds();
    let week = datetime.getDay();
    let ms = datetime.getMilliseconds();
    let minutes = m + s / 60;
    let hours_24 = h + m / 60;
    let hours_12 = 0;
    if (hours_24 > 12){
      hours_12 = hours_24 - 12;
    } else{
      hours_12 = hours_24;
    }
    let seconds = s + ms / 1000;
    var cur_mon = new Date(year, month, 0);
    var cur_mon_count = cur_mon.getDate(); //当前月份总天数
    month = month + date / cur_mon_count;
    if (month > 12){
      month = month - 12;
    }
    return {
      hours_24: (hours_24).toFixed(2), //24小时制
      week: (week).toFixed(0),// 周几
      month: (month).toFixed(2),// 哪一月
      date: (date).toFixed(0),// 哪一天
      hours_12: (hours_12).toFixed(2),// 12小时制
      minutes: (minutes / 5).toFixed(2),// 分钟
      seconds: (seconds).toFixed(2),// 秒数
    }
  }

  componentDidMount() {
    clearInterval(timeTicket);
    var timeTicket = setInterval(() => {
      let dateInfo = this.getDateInfo()
      this.state.options.series[0].data[0].value = dateInfo.hours_24;
      this.state.options.series[1].data[0].value = dateInfo.week;
      this.state.options.series[2].data[0].value = dateInfo.month;
      this.state.options.series[3].data[0].value = dateInfo.date;
      this.state.options.series[4].data[0].value = dateInfo.hours_12;
      this.state.options.series[5].data[0].value = dateInfo.minutes;
      this.state.options.series[6].data[0].value = dateInfo.seconds;
      this.setState({
        options: this.state.options
      })
    }, 1000);
  }
  render() {
    const {options} = this.state
    const echartsViewProps = {
      options,
      styles: {
        textAlign: 'center'
      },
      echartStyle: {
        width: '400px',
        height: '400px',
        margin: '0 auto'
      }
    }
    return(
      <EchartsContainer maxHeight={400} minHeight={400}>
        <EChartsView {...echartsViewProps}/>
      </EchartsContainer>
    );
  }
}

EChartsClock.propTypes = {

}

export default EChartsClock