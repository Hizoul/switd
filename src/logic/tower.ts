
import GameField from "./map"
import Tile, { tileTypes } from "./tile"

class Tower extends Tile {
  public damagableAnts: number
  public damageAmount: number
  public towerRange: number
  constructor(xPos: number, yPos: number, gameField: GameField) {
    super(xPos, yPos, tileTypes.tower, gameField)
    this.damagableAnts = 4
    this.towerRange = 1
  }
  public makeRoundDamage: () => void = () => {
    // find streets in range and damage ant
    const possibleTargets = this.gameField.getNeighbors(this.xPos, this.yPos, this.towerRange)
    // TODO: find targets and deal damage
  }
}

export default Tower
