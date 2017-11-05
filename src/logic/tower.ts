
import { remove, sortBy, union } from "lodash"
import randomNum from "../randomNum"
import Ant from "./ant"
import GameField from "./map"
import Tile, { tileTypes } from "./tile"

class Tower extends Tile {
  public damagableAnts: number
  public damageAmount: number
  public towerRange: number
  public towerType: string
  constructor(xPos: number, yPos: number, gameField: GameField) {
    super(xPos, yPos, tileTypes.tower, gameField)
    this.damagableAnts = 7
    this.towerRange = 1
    this.damageAmount = 13
  }
  public makeRoundDamage: () => void = () => {
    // find streets in range and damage ant
    const possibleTargets = this.gameField.getNeighborStreets(this.xPos, this.yPos, this.towerRange)
    let hittableAnts: Ant[] = []
    for (const target of possibleTargets) {
      hittableAnts = union<Ant>(hittableAnts, target.currentVisitors)
    }
    // console.log("hittableAnts are", hittableAnts)
    let antsHit = 0
    while (antsHit < this.damagableAnts && hittableAnts.length > 0) {
      hittableAnts = sortBy(hittableAnts, ["hp", "uniqueId"])
      const ant = hittableAnts[0]
      ant.hurt(this.damageAmount)
      this.gameField.totalDamageDealt += this.damageAmount
      antsHit++
      if (ant.hp <= 0) {
        remove(hittableAnts, (antToCheck) => antToCheck.uniqueId === ant.uniqueId)
      }
    }
  }
}

export default Tower
