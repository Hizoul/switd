import { union } from "lodash"
import Ant from "./ant"
import Street from "./street"
import Tile from "./tile"
import Tower from "./tower"

class GameField {
  private fieldSizeX: number
  private fieldSizeY: number
  private antList: Ant[]
  private towerList: Tower[]
  private streetList: Street[]

  constructor(fieldSizeX: number, fieldSizeY: number) {
    this.fieldSizeX = fieldSizeX
    this.fieldSizeY = fieldSizeY
  }

  public isOccupied(x: number, y: number) {
    const fullList: Tile[] = union(this.towerList, this.streetList)
    for (const tile of fullList) {
      if (tile.occupies(x, y)) {
        return true
      }
    }
    return false
  }

}

export default GameField
