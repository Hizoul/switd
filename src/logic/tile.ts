class Tile {
  private xPos: number
  private yPos: number
  constructor(xPos: number, yPos: number) {
    this.xPos = xPos
    this.yPos = yPos
  }
  public occupies: (x: number, y: number) => boolean =
  (x: number, y: number) => {
    return x === this.xPos && y === this.yPos
  }
}

export default Tile
