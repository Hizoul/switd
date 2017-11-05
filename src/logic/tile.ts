import GameField from "./map"

const tileTypes = {
  street: 3,
  tower: 6
}

class Tile {
  public xPos: number
  public yPos: number
  public tileType: number
  public gameField: GameField
  public constructor(xPos: number, yPos: number, tileType: number, gameField: GameField) {
    this.xPos = xPos
    this.yPos = yPos
    this.tileType = tileType
    this.gameField = gameField
  }
  public occupies: (x: number, y: number) => boolean =
  (x: number, y: number) => {
    return x === this.xPos && y === this.yPos
  }
}

export default Tile
export { tileTypes }
