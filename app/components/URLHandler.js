import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class URLHandler extends Component {

  componentWillReact() {
    hashHistory.push({
      pathname: `/${ store.zoom }/${ store.lat }/${ store.lng }/app`,
      query: {
        search: store.search,
        orientation: store.orientation,
        size: store.size,
        material: store.material,
        style: store.style
      }
    })
  }

  render() {
    store.lat
    store.lng
    store.zoom
    store.orientation
    store.size
    store.material
    store.style
    store.search
    return <div></div>
  }
}
