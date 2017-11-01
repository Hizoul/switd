import { map, sortBy, union } from "lodash"
import Map from "../logic/map"
import Tile from "../logic/tile"

const prepSnapshotOutput = (gameField: Map) => {
  const ants = sortBy(map(gameField.antList, (ant) => {
    return {
      id: ant.uniqueId, x: ant.currentlyOn.xPos, y: ant.currentlyOn.yPos, hp: ant.hp
    }
  }), ["hp", "id", "x", "y"])
  const tiles = sortBy(map(union<Tile>(gameField.streetList, gameField.towerList), (street) => {
    return {
      x: street.xPos, y: street.yPos
    }
  }), ["x", "y"])
  return {
    ants, tiles
  }
}

export default prepSnapshotOutput
