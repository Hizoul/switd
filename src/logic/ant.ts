import { isArray } from "lodash"
import Street from "./street"

// courtesy of https://stackoverflow.com/a/7228322
const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
let currentmaxid = 1
class Ant {
  public currentlyOn: Street
  public uniqueId: number
  public constructor(currentTile: Street) {
    this.currentlyOn = currentTile
    this.uniqueId = currentmaxid
    currentmaxid++
  }
  public makeNextStep() {
    if (this.currentlyOn.isTarget()) {
      // Already done
      return
    }
    const nextOptions = this.currentlyOn.next
    if (isArray(nextOptions) && nextOptions.length > 0) {
      // TODO: add sophisticated choice based on ACO
      const nextTile = nextOptions[randomIntFromInterval(0, nextOptions.length - 1)]
      this.currentlyOn.leave(this)
      nextTile.enter(this)
      this.currentlyOn = nextTile
    }
  }
}

export default Ant
