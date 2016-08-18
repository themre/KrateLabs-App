import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'
import SentinelWMSLayer from "./SentinelWMSLayer"
import { Map, TileLayer, LayersControl, ZoomControl} from 'react-leaflet'
import moment from 'moment'
import request from 'superagent'

let baseWmsUrl = "http://services.sentinel-hub.com/";
let imgWmsUrl = baseWmsUrl + "v1/wms/dfd8e1c9-5a85-4418-9508-d1fc726e7d91?SERVICE=WMS&REQUEST=GetMap";

@observer
export default class SGMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
  }

  handleMoveEnd = (e) => {
    this.getAvailableDates()
  }
  handleMove = (e) => {
    if (this.sgmap === null) return; //first time you move, sgmap is null, perhaps router calls it???
    console.log(this.sgmap.leafletElement.getCenter().lat, store.lat)
  }

  getAvailableDates = () => {
    if (this.sgmap === null) return; //first time you move, sgmap is null, perhaps router calls it???
    let arr = this.sgmap.leafletElement.getBounds().toBBoxString().split(",");
    let center = this.sgmap.leafletElement.getCenter()
    store.zoom = this.sgmap.leafletElement.getZoom()
    store.lat = center.lat
    store.lng = center.lng
    console.log(store.lat)
    let minX = parseFloat(arr[0]);
    let minY = parseFloat(arr[1]);
    let maxX = parseFloat(arr[2]);
    let maxY = parseFloat(arr[3]);

    var coords = [];
    coords.push([minX, minY]);
    coords.push([maxX, minY]);
    coords.push([maxX, maxY]);
    coords.push([minX, maxY]);
    coords.push([minX, minY]);
    var polygon = {
      "type": "Polygon",
      "crs": {
        "type": "name",
        "properties": {
          "name": "urn:ogc:def:crs:EPSG::4326"
        }
      },
      "coordinates": [
        coords
      ]
    };
    var url = baseWmsUrl + "index/v1/finddates?timefrom=" + store.minDate + "&timeto=" + store.maxDate + "&maxcc=" + 0.2;
    request.post(url)
      .set('Content-Type', 'application/json')
      .type('json')
      .send(polygon)
      .end((err, res) => {
        this.state.availableDays = res.text;
      })
  }

  render() {
    const styles = {
      map: {
        width: '100%',
        bottom: '0px',
        top: '0px',
        position: 'absolute',
        margin: 0
      }
    }
    return (<Map
      ref={(c) => this.sgmap = c}
      id="mapHolder"
      key={1}
      center={[parseInt(store.lat), parseInt(store.lng)]}
      zoom={parseInt(store.zoom) }
      style={styles.map}
      zoomControl={false}
      onMoveend={this.handleMoveEnd} 
      onMove={this.handleMove} 
      >
      <ZoomControl position="bottomright"/>
      <LayersControl position='topright'>
        <LayersControl.BaseLayer name='OpenStreetMap.BlackAndWhite' checked={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
            url='http://{s}.api.cartocdn.com/base-dark/{z}/{x}/{y}.png'
            />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name='Sentinel2' checked={true}>
          <SentinelWMSLayer
            key={1}
            maxZoom={15}
            minZoom={12}
            opacity={store.opacity / 100.0}
            url={baseWmsUrl + '/v1/wms/dfd8e1c9-5a85-4418-9508-d1fc726e7d91?showLogo=false'}
            layers={"B02,B03,B04"}
            name="Sentinel2"
            time={"2015-10-01/2016-01-01"}
            maxcc={20}
            tileSize={1024}
            changeHandlers={this.props.changeHandlers}
            transparent={false}
            attribution='&copy; <a href="http://www.sentinel-hub.com" target="_blank">Sentinel layer</a> contributors'
            />
        </LayersControl.Overlay>
      </LayersControl>
    </Map>)

  }
}
