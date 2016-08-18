import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'


@observer
export default class Result extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      hover: (store.selection == this.props.index)
    }
  }

  componentWillReact() {
    if (store.selection == this.props.index) this.setState({ hover: true })
    else this.setState({ hover: false })
  }

  handleClick(e) {
    let bounds = getBounds(this.props.json.geometry)
    let center = getCenter(this.props.json.geometry)
    if (bounds) map.fitBounds(bounds)
    else if (center) map.flyTo({center: center, zoom: 13})
    store.results = []
  }

  handleMouseEnter() {
    store.selection = -1
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  render() {
    const styles = {
      result: {
        textTransform: 'none',
        fontWeight: 'normal',
        fontFamily: 'fledgling',
        border: 'none',
        cursor: `pointer`,
        color: (this.state.hover) ? '#FB7461' : 'white',
        textAlign: 'left',
        fontSize: '35px',
        paddingBottom: '10px',
        outline: 'none',
        backgroundColor: 'transparent',
        transition: 'none',
        fontWeight: 'bold',
        WebKitTransition: 'none',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      }
    }
    store.selection
    return (
      <div
        style={ styles.result}
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        onKeyDown={ this.handleKeyDown }
        block>
        { this.props.json.formatted_address }
      </div>
    )
  }
}
