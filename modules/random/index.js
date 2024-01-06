import URC from './randomColor.js'
import URS from './randomString.js'

class Random {
  urs
  urc
  constructor() {
    this.urs = new URS()
    this.urc = new URC()
  }

  string() {
    return this.urs.generate()
  }

  color() {
    return this.urc.generate()
  }
}

export default () => new Random()
