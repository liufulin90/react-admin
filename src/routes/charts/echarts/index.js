import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { Row, Col, Card, Tree, Collapse } from 'antd'
import {EChartsClock} from '../../../components/EchartsContainer'
import GaugeCarDark from '../../Dashboard/components/gaugeCarDark'
import Wraper from '../../../components/Widgets/Wraper'

const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode
const colProps = {
  lg: 12,
  md: 24,
}

const EditorPage = ({dashboard}) => {
  // console.log(dashboard)
  const {carData} = dashboard
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.`;
  return (
    <div className="content-inner">
      <div>
        <Tree
          showLine
          defaultExpandedKeys={['0-0-1']}
          isLeaf
        >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" />
              <TreeNode title="leaf" key="0-0-0-1" />
              <TreeNode title="leaf" key="0-0-0-2" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title="leaf" key="0-0-1-0" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2">
              <TreeNode title="leaf" key="0-0-2-0" />
              <TreeNode title="leaf" key="0-0-2-1" />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
      <div>
        <Collapse >
          <Panel header={'This is panel header 1'} key="1">
            <Collapse defaultActiveKey="1-1">
              <Panel header={'This is panel nest panel'} key="1-1">
                <Collapse>
                  <Panel header={'This is panel nest panel'} key="1-1-1">
                    <Collapse>
                      <Panel header={'This is panel nest panel'} key="1-1-1-1">
                        <p>{text}</p>
                      </Panel>
                    </Collapse>
                  </Panel>
                </Collapse>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header={'This is panel header 2'} key="2">
            <p>{text}</p>
          </Panel>
          <Panel header={'This is panel header 3'} key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
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
