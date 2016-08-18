import { isEqual } from 'lodash'
import { WMSTileLayer } from 'react-leaflet';

export default class SentinelWMSLayer extends WMSTileLayer {
    constructor(props) {
        super(props)
        this.prevProps = props

        props.changeHandlers.registerHandler(
            this.key,
            () => {
                if (isEqual(this.prevProps.opacity, this.props.opacity)) {
                    this.leafletElement.setParams(this.props)
                }
                this.prevProps = this.props
            })
    }
}