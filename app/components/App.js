import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import SGMap from './SGMap'
import DevTools from 'mobx-react-devtools';
import {
  Logo,
  Options,
  Checkout,
  Price,
  URLHandler } from '../components'

@observer
export default class App extends Component {
  constructor(props) {
    super(props)

    this.handlers = {}
    // Store all URL Queries into MobX Store
    Object.keys(props.location.query).map((key) => {
      store[key] = props.location.query[key]
    })

    // Store all URL Params into MobX Store
    Object.keys(props.params).map((key) => {
      store[key] = props.params[key]
    })
  }

  registerHandler = (key, handler) => {
    this.handlers[key] = handler
  }
  changeParams = (stateDelta) => {
    const {handlers} = this
    this.setState(stateDelta, () => {
      for (let handler in handlers) {
        handlers[handler]()
      }
    })
  }

  showStore = () => {
    console.log(store.lat, store.lng)
  }

  render() {
    const styles = {
      container: {
        backgroundColor: store.grey
      },
      left: {
        height: store.height,
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      },
      right: {
        overflowY: 'auto',
        padding: 0,
        height: store.height,
        paddingBottom: '50px'
      },
      row: {
        marginBottom: 0
      }
    }
    return (
      <Grid fluid={ true } style={ styles.container }>
        <Row style={ styles.row }>
          { /* App */ }
          <URLHandler />
          <DevTools />
          { /* Map */ }
          <Col xs={12} sm={8} md={8} lg={9} style={ styles.left }>
            <SGMap
              changeHandlers={this} />

          </Col>

          { /* Options */ }
          <Col xs={12} sm={4} md={4} lg={3} style={ styles.right }>
            <Options 
              showStore={this.showStore}/>
            <Price />
            <Checkout />
          </Col>
        </Row>
      </Grid>
    )
  }
}
