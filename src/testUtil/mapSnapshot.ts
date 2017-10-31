import { map, union } from "lodash"
import Map from "../logic/map"
import Tile from "../logic/tile"

const prepSnapshotOutput = (gameField: Map) => {
  const ants = map(gameField.antList, (ant) => {
    return {
      id: ant.uniqueId, x: ant.currentlyOn.xPos, y: ant.currentlyOn.yPos
    }
  })
  const tiles = map(union<Tile>(gameField.streetList, gameField.towerList), (street) => {
    return {
      x: street.xPos, y: street.yPos
    }
  })
  return {
    ants, tiles
  }
}

export default prepSnapshotOutput
