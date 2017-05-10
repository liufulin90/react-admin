import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Search.less'
import { Input, Select, Button, Icon } from 'antd'

class Search extends React.Component {

  constructor(props) {
      super(props)
      const { select, selectProps } = this.props
      this.state = {
        clearVisible: false,
        selectValue: select && selectProps ? selectProps.defaultValue : ''
      }
  }



  handleSearch = () => {
    const data = {
      keyword: ReactDOM.findDOMNode(this.refs.searchInput).value
    }
    if (this.props.select) {
      data.field = this.state.selectValue
    }
    this.props.onSearch && this.props.onSearch(data)
  }
  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== ''
    })
  }
  handeleSelectChange = value => {
    this.setState({
      ...this.state,
      selectValue: value
    })
  }
  handleClearInput = () => {
    ReactDOM.findDOMNode(this.refs.searchInput).value = ''
    this.setState({
      clearVisible: false
    })
    this.handleSearch()
  }
  render () {
    const {size, select, selectOptions, selectProps, style, keyword} = this.props
    const {clearVisible} = this.state
    return (
      <Input.Group compact size={size} className={styles.search} style={style}>
        {select && <Select ref='searchSelect' onChange={this.handeleSelectChange} size={size} {...selectProps}>
          {selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
        </Select>}
        <Input ref='searchInput' size={size} onChange={this.handleInputChange} onPressEnter={this.handleSearch} defaultValue={keyword}/>
        <Button size={size} type='primary' onClick={this.handleSearch}><Icon type="search" />搜索</Button>
        {clearVisible && <Icon type='cross' onClick={this.handleClearInput} />}
      </Input.Group>
    )
  }
}

export default Search
