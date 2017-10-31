import { find, union } from "lodash"
import Ant from "./ant"
import Street from "./street"
import Tile, { tileTypes } from "./tile"
import Tower from "./tower"

class GameField {
  private fieldSizeX: number
  private fieldSizeY: number
  private antList: Ant[]
  private towerList: Tower[]
  private streetList: Street[]
  constructor(fieldSizeX: number = 10, fieldSizeY: number = 10) {
    this.fieldSizeX = fieldSizeX
    this.fieldSizeY = fieldSizeY
    this.towerList = []
    this.streetList = []
  }
  /**
   * Check wether a certain position in the map is already occupied by a tile
   * @param x Position
   * @param y Position
   */
  public isOccupied(x: number, y: number) {
    const fullList: Tile[] = union(this.towerList, this.streetList)
    for (const tile of fullList) {
      if (tile.occupies(x, y)) {
        return true
      }
    }
    return false
  }

  /**
   * Returns true if successfull false otherwise
   * @param newTile Tile to insert
   */
  public addTile(newTile: Tile) {
    if (!this.isOccupied(newTile.xPos, newTile.yPos)) {
      const addTo = newTile.tileType === tileTypes.tower ? this.towerList : this.streetList
      addTo.push(newTile)
      return true
    }
    return false
  }
  public getStart: () => Street = () => {
    return this.streetList[0]
  }
}

export default GameField
