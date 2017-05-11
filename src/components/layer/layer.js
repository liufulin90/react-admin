import { Modal, message } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styles from './layer.less'
const { info, success, error, warning, confirm } = Modal

const layer = {
  prefixCls: 'ant-layer',
  index: 1,
  info,
  success,
  error,
  warning,
  confirm,
}

/**
 * 对弹层监听鼠标移动事件
 * @param clickEl
 * @param moveEl
 */
function listenerMoveEvent (clickEl, moveEl) {
  clickEl.style.cursor = 'move'
  var disX = 0;
  var disY = 0;
  clickEl.onmousedown = function (ev) {  //鼠标按下
    clearEvent(clickEl)
    var oEvent = ev || event;       //判断浏览器兼容
    disX = oEvent.clientX - moveEl.offsetLeft;    //鼠标横坐标点到 moveEl 的offsetLeft距离
    disY = oEvent.clientY - moveEl.offsetTop;     //鼠标纵坐标点到 moveEl 的offsetTop距离
    clickEl.onmousemove = function (ev) {      //鼠标移动

      var oEvent = ev || event;
      var l = oEvent.clientX - disX;          //获取 moveEl 左边的距离
      var t = oEvent.clientY - disY;          //获取 moveEl 上边的距离
      if (l < 0) {        //判断 moveEl 的可视区，为避免DIV失去鼠标点
        l = 0;
      } else if (l > document.body.clientWidth - moveEl.offsetWidth) {
        l = document.body.clientWidth - moveEl.offsetWidth;
      }
      if (t < 0) {
        t = 0;
      } else if (t > document.body.clientHeight - moveEl.offsetHeight) {
        t = document.body.clientHeight - moveEl.offsetHeight;
      }
      if (moveEl.style.position != 'absolute') {
        moveEl.style.position = 'absolute'
      }
      moveEl.style.left = l + 'px';      //确定 moveEl 的左边位置
      moveEl.style.top = t + 'px';       //确定 moveEl 的上边位置
    }
    clickEl.onmouseup = function () {      //当鼠标松开后关闭移动事件和自身事件
      clearEvent(clickEl)
    }
    return false;
  }
  clickEl.onmouseup = function () {      //当鼠标松开后关闭移动事件和自身事件
    clearEvent(clickEl)
  }
  function clearEvent (clickEl) {
    // 关闭移动事件和自身事件
    clickEl.onmousemove = null;
    clickEl.onmouseup = null;
  }
}

layer.close = (index) => new Promise((resolve, reject) => {
  const { prefixCls } = layer
  let div = document.getElementById(`${prefixCls}-reference-${index}`)
  if (index === undefined) {
    const references = document.querySelectorAll(`.${prefixCls}-reference`)
    div = references[references.length - 1]
  }
  if (!div) {
    message.error('关闭失败，未找到Dom')
    return
  }
  const unmountResult = ReactDOM.unmountComponentAtNode(div)
  if (unmountResult && div.parentNode) {
    div.parentNode.removeChild(div)
    resolve(index)
  } else {
    reject(index)
  }
})

layer.closeAll = () => {
  const { prefixCls } = layer
  const references = document.querySelectorAll(`.${prefixCls}-reference`)
  let i = 0
  while (i < references.length) {
    layer.close()
    i++
  }
}

layer.open = (config) => {
  const props = Object.assign({}, config)
  const { content, isMove = true, ...modalProps } = props
  const { className, wrapClassName = '', verticalCenter = true } = modalProps
  const { prefixCls } = layer
  const index = layer.index++
  let div = document.createElement('div')
  div.id = `${prefixCls}-reference-${index}`
  div.className = `${prefixCls}-reference`
  document.body.appendChild(div)

  ReactDOM.render(
    <Modal
      visible
      title="Title"
      transitionName="zoom"
      maskTransitionName="fade"
      onCancel={() => {
        layer.close(index)
      }}
      onOk={() => {
        layer.close(index)
      }}
      {...modalProps}
      wrapClassName={classnames({ [styles.verticalCenter]: verticalCenter, [wrapClassName]: true })}
      className={classnames(prefixCls, className, [`${prefixCls}-${index}`])}
    >
      <div className={`${prefixCls}-body-wrapper`} style={{ maxHeight: document.body.clientHeight - 256 }}>
        {content}
      </div>
    </Modal>, div)
  if (isMove) {
    let moveEl = document.getElementsByClassName(`${prefixCls}-${index}`)[0] // ant-modal
    let clickEl = moveEl.children[0].children[1] // 'ant-modal-header
    listenerMoveEvent(clickEl, moveEl)
  }
  return index
}

export default layer
