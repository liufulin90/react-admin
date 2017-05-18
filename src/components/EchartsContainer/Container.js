import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import styles from './Container.less'
import classnames from 'classnames'
import {Icon} from 'antd'

class Container extends Component{
  constructor (props) {
    super(props)
    const {fullShow} = this.props.modal
    this.state = {
      fullShow:  fullShow
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

  render() {
    let {children, ratio = 5 / 2, minHeight = 200, maxHeight = 850, modal, dispatch} = this.props

    const {fullShow} = this.state
    // 全屏时不设置最低高度
    fullShow && (maxHeight = '')
    return (
      <div className={classnames(styles.container, fullShow ? styles.isBigShow : '')} style={{ minHeight, maxHeight}}>
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
    )
  }
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
  ratio: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  modal: PropTypes.object
}

function mapStateToProps({modal}) {
  return { modal }
}

export default connect(mapStateToProps)(Container)
