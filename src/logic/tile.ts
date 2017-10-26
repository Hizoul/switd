const tileTypes = {
  street: 3,
  tower: 6
}

class Tile {
  public xPos: number
  public yPos: number
  public tileType: number
  protected constructor(xPos: number, yPos: number, tileType: number) {
    this.xPos = xPos
    this.yPos = yPos
    this.tileType = tileType
  }
  public occupies: (x: number, y: number) => boolean =
  (x: number, y: number) => {
    return x === this.xPos && y === this.yPos
  }
}

export default Tile
export { tileTypes }
