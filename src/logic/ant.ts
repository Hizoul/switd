import { isArray } from "lodash"
import randomNum from "../randomNum"
import Street from "./street"

let currentmaxid = 1
class Ant {
  public currentlyOn: Street
  public walkedPath: Street[]
  public uniqueId: number
  public hp: number
  public constructor(currentTile: Street) {
    this.currentlyOn = currentTile
    this.uniqueId = currentmaxid
    this.walkedPath = [currentTile]
    this.hp = 50
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
      const nextTile = nextOptions[randomNum(0, nextOptions.length - 1)]
      this.walkedPath.push(nextTile)
      this.currentlyOn.leave(this)
      nextTile.enter(this)
      this.currentlyOn = nextTile
    }
  }
  public hurt(damageDealt: number) {
    this.hp -= damageDealt
    if (this.hp <= 0) {
      this.currentlyOn.gameField.removeAnt(this)
      this.currentlyOn.leave(this)
      // TODO: influence scent strength on paths
    }
  }
}

export default Ant
