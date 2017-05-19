import React, {Component} from 'react'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import styles from './Wraper.less'
import classnames from 'classnames'
import {Icon} from 'antd'

class Wraper extends Component{
  constructor (props) {
    super(props)
    this.state = {
      fullShow:  false,
      position: {
        x: 0,
        y: 0
      }
    }
  }
  /**
   * 点击放大缩小
   */
  handleFull = () => {
    const {fullShow} = this.state
    this.setState({
      fullShow: !fullShow
    })
  }

  /**
   * 拖拽开始
   * @returns {boolean}
   */
  dragStart = () => {
    // do someting
    return true
  }

  /**
   * 拖拽结束
   * @returns {boolean}
   */
  dragStop = (e, data) => {
    this.setState({
      position: {
        x: data.x,
        y: data.y
      }
    })
  }

  render() {
    let {children, ratio = 5 / 2, minHeight = 200, maxHeight = 850, maxWidth = 450,dispatch} = this.props

    const {fullShow} = this.state
    // 全屏时不设置最低高度
    let dragOptions = {
      axis : 'both',
      onStart: fullShow ? ()=> false : this.dragStart,
      onStop: this.dragStop
    }
    if (fullShow) {
      maxHeight = ''
      maxWidth = ''
      Object.assign(dragOptions, {
        position: {x: 0, y: 0}
      })
    } else {
      let {x, y} = this.state.position
      Object.assign(dragOptions, {
        position: {x: x, y: y}
      })
    }
    return (
      <Draggable
        {...dragOptions}
      >
        <div className={classnames(styles.container, fullShow ? styles.isBigShow : '', fullShow ? '' : styles.wraper)}
             style={{ minHeight, maxHeight, maxWidth}}>
          <div style={{ marginTop: `${100 / ratio}%` || '100%' }}></div>
          <div className={styles.content} style={{ minHeight, maxHeight }}>
            {children}
          </div>
          <div className={styles.scaleIcon} onClick={this.handleFull}>
            {
              fullShow ? <Icon type="shrink" /> : <Icon type="arrows-alt" />
            }
          </div>
        </div>
      </Draggable>
    )
  }
}

Wraper.propTypes = {
  children: PropTypes.element.isRequired,
  ratio: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  modal: PropTypes.object
}

function mapStateToProps({modal}) {
  return { modal }
}

export default connect(mapStateToProps)(Wraper)
