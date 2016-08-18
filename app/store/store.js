import { observable, computed } from 'mobx'
import validator from 'validator'
import moment from 'moment'

export const store = new class Store {
  // API
  api_url = 'https://api.kratelabs.addxy.com'
  @observable svg = ''
  @observable png = ''

  //CUSTOM
  @observable maxDate = moment().format("YYYY-MM-DD")
  @observable selectedDate = moment().format("YYYY-MM-DD")
  @observable minDate = "2015-01-01"
  @observable availableDays:array = []
  
  // HTML
  @observable height = window.innerHeight
  @observable width = window.innerWidth

  // Search
  @observable search = ''
  @observable results = []
  @observable selection = 0

  // App Options
  @observable orientation = 1
  @observable material = 1
  @observable size:number = 1
  @observable email = ''

  // Map
  @observable zoom:number = 12
  @observable opacity:number = 50
  @observable lat:number = 43.650128
  @observable lng:number = -79.382185
  @observable bearing = 0.0
  @observable pitch = 0.0
  @observable style = 1

  sizeTable = {
    1: {1: '24" x 18"', 2: '18" x 24"'},
    2: {1: '36" x 24"', 2: '24" x 36"'},
    3: {1: '42" x 36"', 2: '36" x 48"'}
  }

  materialTable = {
    1: 'Acrylic',
    2: 'Photo Film'
  }

  orientationTable = {
    1: 'Landscape',
    2: 'Portrait'
  }

  tiel = '#4AC7B0'
  grey = '#494141'
  salmon = '#FB7461'
  lightGrey = '#E6E6DD'
  mediumGrey = '#B9BDB1'
  lightBlue = '#ACC6CB'

  constructor() {
    window.addEventListener('resize', this.listenerResize.bind(this))
  }

  @computed get styleMax() {
    return Object.keys(this.styleTable).length
  }

  @computed get isXs() {
    return this.width < 768
  }

  @computed get isSm() {
    return 768 <= this.width && this.width < 992
  }

  @computed get isMd() {
    return 992 <= this.width && this.width < 1200
  }

  @computed get isLg() {
    return this.width >= 1200
  }

  @computed get sizeText() {
    return this.sizeTable[this.size][this.orientation]
  }

  @computed get materialText() {
    return this.materialTable[this.material]
  }

  @computed get orientationText() {
    return this.orientationTable[this.orientation]
  }

  @computed get emailValid() {
    return validator.isEmail(this.email)
  }

  @computed get price() {
    let materialFactor = {
      1: 1,
      2: 0.5
    }
    let sizeFactor = {
      1: 450,
      2: 550,
      3: 650
    }
    // # Variants
    // this.size = (1: Medium, 2: Large, 3: X-Large)
    // this.material = (1: Acrylic, 2: Photo Film)
    return sizeFactor[this.size] * materialFactor[this.material]
  }

  listenerResize(e) {
    this.height = window.innerHeight
    this.width = window.innerWidth
  }
}
