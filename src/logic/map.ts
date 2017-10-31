import { find, union } from "lodash"
import Ant from "./ant"
import Street from "./street"
import Tile, { tileTypes } from "./tile"
import Tower from "./tower"

class GameField {
  public fieldSizeX: number
  public fieldSizeY: number
  public antList: Ant[]
  public towerList: Tower[]
  public streetList: Street[]
  public componentUpdateTrigger: any
  public currentTick: number
  constructor(fieldSizeX: number = 10, fieldSizeY: number = 10) {
    this.fieldSizeX = fieldSizeX
    this.fieldSizeY = fieldSizeY
    this.towerList = []
    this.streetList = []
    this.antList = []
    this.currentTick = 0
    this.componentUpdateTrigger = () => false
  }
  /**
   * Check wether a certain position in the map is already occupied by a tile
   * @param x Position
   * @param y Position
   */
  public isOccupied(x: number, y: number) {
    const fullList: Tile[] = union<Tile>(this.towerList, this.streetList)
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
      const addTo: any = newTile.tileType === tileTypes.tower ? this.towerList : this.streetList
      addTo.push(newTile)
      return true
    }
    return false
  }
  public getStart: () => Street = () => {
    return this.streetList[0]
  }
  public getTarget: () => Street = () => {
    const ret: any = find(this.streetList, (a: Street) => a.isTarget())
    return ret
  }
  /**
   * Process ticks for a game
   * at first towers deal damage and kill ants
   * then ants can make their move
   */
  public processTick: () => void = () => {
    for (const tower of this.towerList) {
      tower.makeRoundDamage()
    }
    for (const ant of this.antList) {
      ant.makeNextStep()
    }
    this.currentTick++
    this.componentUpdateTrigger({tickNum: this.currentTick})
  }
  public spawnNewAnt: (amount: number) => void = (amount = 1) => {
    const start = this.getStart()
    for (let i = 0; i < amount; i++) {
      const ant = new Ant(start)
      start.enter(ant)
      this.antList.push(ant)
    }
  }
  public registerComponentToUpdate = (setStateMethod: any) => {
    this.componentUpdateTrigger = setStateMethod
  }
}

export default GameField
