import { findIndex, remove } from "lodash"
import Ant from "./ant"
import GameField from "./map"
import Tile, { tileTypes } from "./tile"

const direction = {
  up: 2, down: 3, left: 5, right: 6
}

const getDirFromNum: (dir: number) => number[] = (dir) => {
  switch (dir) {
    case direction.up: return [0, -1]
    case direction.down: return [0, 1]
    case direction.left: return [-1, 0]
    case direction.right: return [1, 0]
    default: return [0, 1]
  }
}

class Street extends Tile {
  public next: Street[]
  public previous: Street[]
  public currentVisitors: Ant[]
  public pheromoneLevel: number
  constructor(xPos: number, yPos: number, gameField: GameField) {
    super(xPos, yPos, tileTypes.street, gameField)
    this.next = []
    this.previous = []
    this.currentVisitors = []
    this.pheromoneLevel = 0
  }
  public isTarget: () => boolean = () => {
    return this.next.length === 0
  }
  public isStart: () => boolean = () => {
    return this.previous.length === 0
  }
  public multiExtend: (extendToDir: number, amountOfTimes: number) => Street = (extendToDir, amountOfTimes) => {
    let endOfAdding: any = this
    for (let i = 0; i < amountOfTimes; i++) {
      endOfAdding = endOfAdding.extend(extendToDir)
    }
    return endOfAdding
  }
  public extend: (extendToDir: number) => Street = (extendToDir) =>  {
    const directionHelper = getDirFromNum(extendToDir)
    const nextStreet = new Street(
      this.xPos + directionHelper[0],
      this.yPos + directionHelper[1],
      this.gameField
    )
    if (this.gameField.addTile(nextStreet)) {
      this.next.push(nextStreet)
      nextStreet.previous.push(this)
      return nextStreet
    }
    return this
  }
  public addIntersection(intersec: Street) {
    this.next.push(intersec)
    intersec.previous.push(this)
  }
  public enter(ant: Ant) {
    if (findIndex(this.currentVisitors, (e: Ant) => e.uniqueId === ant.uniqueId) !== -1) {
      return false
    }
    return this.currentVisitors.push(ant)
  }
  public leave(ant: Ant) {
    return remove(this.currentVisitors, (e: Ant) => e.uniqueId === ant.uniqueId)
  }
  public adjustPheromoneLevel(by: number) {
    this.pheromoneLevel += by
    if (this.pheromoneLevel < 1) {
      this.pheromoneLevel = 1
    }
  }
}

export default Street
export { direction }
