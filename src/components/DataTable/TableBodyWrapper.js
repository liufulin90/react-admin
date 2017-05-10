import React, { PropTypes } from 'react'
import { TweenOneGroup } from 'rc-tween-one'
import styles from './TableBodyWrapper.less'

const enterAnim = [
  {
    opacity: 0,
    x: 30,
    backgroundColor: '#fffeee',
    duration: 0
  }, {
    height: 0,
    duration: 200,
    type: 'from',
    delay: 250,
    ease: 'easeOutQuad',
    onComplete: (e) => {
      e.target.style.height = 'auto'
    },
  }, {
    opacity: 1,
    x: 0,
    duration: 250,
    ease: 'easeOutQuad'
  }, {
    delay: 1000,
    backgroundColor: '#fff'
  }
]

const leaveAnim = [
  {
    duration: 250,
    x: -30,
    opacity: 0
  }, {
    height: 0,
    duration: 200,
    ease: 'easeOutQuad'
  }
]

function TableBodyWrapper({ body, page = 1, current }) {

  // 切换分页去除动画;
  if(current != +page) {
    return body
  }

  return (
    <TweenOneGroup
    component="tbody"
    className={body.props.className}
    enter={enterAnim}
    leave={leaveAnim}
    appear={false}>
      {body.props.children}
    </TweenOneGroup>
  )
}

TableBodyWrapper.propTypes = {
  page: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  current: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired
}

export default TableBodyWrapper
