import GameField from "./map"
import Tile, { tileTypes } from "./tile"

const direction = {
  up: 2, down: 3, left: 5, right: 6
}

const getDirFromNum: (dir: number) => number[] = (dir) => {
  switch (dir) {
    case direction.up: return [0, 1]
    case direction.down: return [0, -1]
    case direction.left: return [-1, 0]
    case direction.right: return [1, 0]
    default: return [0, 1]
  }
}

class Street extends Tile {
  public next: Street[]
  public previous: Street[]
  public gameField: GameField
  constructor(xPos: number, yPos: number, gameField: GameField) {
    super(xPos, yPos, tileTypes.street)
    this.gameField = gameField
    this.next = []
    this.previous = []
  }
  public isTarget: () => boolean = () => {
    return this.next.length === 0
  }
  public isStart: () => boolean = () => {
    return this.previous.length === 0
  }
  public extend: (extendToDir: number) => Street | null = (extendToDir) =>  {
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
    return null
  }
}

export default Street
