import { filter, find, isNil, remove, union } from "lodash"
import noOp from "../noOp"
import randomNum from "../randomNum"
import Ant from "./ant"
import Street from "./street"
import Tile, { tileTypes } from "./tile"
import Tower from "./tower"

const experimentChoices = {
  onlyOnSuccess: 6,
  /**
   * Rank-based ant system (ASrank) = shortest path
   */
  shortestPathWeight: 8,
  shortestPathOnly: 9,
  /**
   * also called Ant colony system Algorithm
   */
  continousVapor: 11
}

class GameField {
  public fieldSizeX: number
  public fieldSizeY: number
  public antList: Ant[]
  public towerList: Tower[]
  public streetList: Street[]
  public intersectionList: Array<{beginning: Street, target: Street}>
  public componentUpdateTrigger: any
  public currentTick: number
  public tickSpeed: number
  public spawnThreshold: number
  public continueTimer: boolean
  public experimentType: number
  public decayStrength: number
  public totalDamageDealt: number
  public shortestPathLength: number
  public pheromoneIncreaseStrength: number = 0.01
  public towersEnabled: boolean = true
  public amountOfDeadAnts: number
  public amountOfSpawnedAnts: number
  public substractForDeath: boolean = false
  constructor(fieldSizeX: number = 10, fieldSizeY: number = 10) {
    this.fieldSizeX = fieldSizeX
    this.fieldSizeY = fieldSizeY
    this.towerList = []
    this.streetList = []
    this.antList = []
    this.intersectionList = []
    this.currentTick = 0
    this.tickSpeed = 1800
    this.spawnThreshold = 3
    this.continueTimer = false
    this.componentUpdateTrigger = {setState: noOp}
    this.experimentType = experimentChoices.onlyOnSuccess
    this.decayStrength = -0.007
    this.totalDamageDealt = 0
    this.shortestPathLength = 99999999999999
    this.amountOfDeadAnts = 0
    this.amountOfSpawnedAnts = 0
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
        return tile
      }
    }
    return null
  }

  /**
   * Returns true if successfull false otherwise
   * @param newTile Tile to insert
   */
  public addTile(newTile: Tile) {
    if (isNil(this.isOccupied(newTile.xPos, newTile.yPos))) {
      const addTo: any = newTile.tileType === tileTypes.tower ? this.towerList : this.streetList
      addTo.push(newTile)
      return true
    }
    return false
  }
  public getNeighborPositions(xPos: number, yPos: number, range: number) {
    const toCheck: Array<{x: number, y: number}> = []
    for (let i = 1; i <= range; i++) {
      toCheck.push({x: xPos + i, y: yPos})
      toCheck.push({x: xPos - i, y: yPos})
      toCheck.push({x: xPos, y: yPos + i})
      toCheck.push({x: xPos, y: yPos - i})
      toCheck.push({x: xPos + i, y: yPos + i})
      toCheck.push({x: xPos + i, y: yPos - i})
      toCheck.push({x: xPos - i, y: yPos + i})
      toCheck.push({x: xPos - i, y: yPos - i})
    }
    return toCheck
  }
  public getNeighbors: (xPos: number, yPos: number, range: number) => Tile[] = (xPos, yPos, range) => {
    const tiles: Tile[] = []
    // TODO find neighbors
    const toCheck = this.getNeighborPositions(xPos, yPos, range)
    for (const checkMe of toCheck) {
      const found = this.isOccupied(checkMe.x, checkMe.y)
      if (!isNil(found)) {
        tiles.push(found)
      }
    }
    return tiles
  }
  public getNeighborStreets: (xPos: number, yPos: number, range: number) => Street[] = (xPos, yPos, range) => {
    const back: any = filter(this.getNeighbors(xPos, yPos, range), (tile) => tile.tileType === tileTypes.street)
    return back
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
    for (const street of this.streetList) {
      street.adjustPheromoneLevel(this.decayStrength)
    }
    this.currentTick++
    this.componentUpdateTrigger.setState({tickNum: this.currentTick})
  }
  public spawnNewAnt: (amount: number) => void = (amount = 1) => {
    const start = this.getStart()
    for (let i = 0; i < amount; i++) {
      const ant = new Ant(start)
      start.enter(ant)
      this.antList.push(ant)
    }
    this.amountOfSpawnedAnts += amount
  }

  public removeAnt: (ant: Ant) => void = (ant) => {
    remove(this.antList, (a1) => a1.uniqueId === ant.uniqueId)
  }
  public registerComponentToUpdate = (setStateMethod: any) => {
    this.componentUpdateTrigger = setStateMethod
  }

  public startTimer() {
    this.continueTimer = true
    setTimeout(this.processTime, this.tickSpeed)
  }
  public stopTimer() {
    this.continueTimer = false
  }
  public processTime = () => {
    this.spawnNewAnt(randomNum(0, this.spawnThreshold))
    this.processTick()
    if (this.continueTimer) {
      setTimeout(this.processTime, this.tickSpeed)
    }
  }
}

export default GameField
export { experimentChoices }
