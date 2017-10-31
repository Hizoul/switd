
import Tile, { tileTypes } from "./tile"

class Tower extends Tile {
  constructor(xPos: number, yPos: number) {
    super(xPos, yPos, tileTypes.tower)
  }
  public makeRoundDamage: () => void = () => {
    // find streets in range and damage ant

  }
}

export default Tower
