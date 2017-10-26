
import Tile, { tileTypes } from "./tile"

class Tower extends Tile {
  constructor(xPos: number, yPos: number) {
    super(xPos, yPos, tileTypes.tower)
  }
}

export default Tower
