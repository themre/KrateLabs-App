import React from 'react'
import classNames from 'classnames'
import { Button, ButtonGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Options extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
  }

  render() {
    let styles = {
      container: {
        paddingTop: 90,
        textAlign: 'center'
      },
      title: {
        textTransform: 'none',
        fontWeight: 'normal',
        color: '#E6E6DD',
        fontFamily: '"AlteHaasGrotesk", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }
    }
    let buttonOn = 'success'
    let buttonOff = 'info'
    let buttonSize = ''

    return (
      <div style={ styles.container }>
        <button onClick={this.props.showStore}>show</button>
        <h2 style={ styles.title }>Options</h2>

        { /* Page Orientation */ }
        <h4 style={ styles.title }>Orientation</h4>
        <ButtonGroup bsSize={ buttonSize }>
          { Object.keys(store.orientationTable).map(key => 
            <Button
              key={ key }
              bsStyle={ store.orientation == key ? 'danger' : buttonOff }
              onClick={ () => store.orientation = key }>
              { store.orientationTable[key] }
            </Button>
          )}
        </ButtonGroup>

        { /* Layout Size */ }
        <h4 style={ styles.title }>Layout Size</h4>
        <ButtonGroup bsSize={ buttonSize }>
          { Object.keys(store.sizeTable).map(key =>
            <Button
              key={ key }
              bsStyle={ store.size == key ? buttonOn : buttonOff }
              onClick={ () => store.size = key }>
              { store.sizeTable[key][store.orientation] }
            </Button>
          )}
        </ButtonGroup>

        { /* Material Type */ }
        <h4 style={ styles.title }>Material Type</h4>
        <ButtonGroup bsSize={ buttonSize }>
          { Object.keys(store.materialTable).map(key =>
            <Button
              key={ key }
              bsStyle={ store.material == key ? buttonOn : buttonOff }
              onClick={ () => store.material = key }>
              { store.materialTable[key] }
            </Button>
          )}
        </ButtonGroup>
      </div>
    )
  }
}
