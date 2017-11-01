import { isNil, isNumber } from "lodash"
import Map from "../logic/map"
import Tile from "../logic/tile"
import randomNum from "../randomNum"

export interface IWindowDimensions {
  width: number
  height: number
}

const windowToUse: any = typeof(window) === "undefined" ? {
  innerWidth: 100,
  innerHeight: 100
} : window

const getPositionForTile = (t: Tile, field: Map, sizeChange?: number) => {
  const w = windowToUse.innerWidth
  const h = windowToUse.innerHeight
  const wm = field.fieldSizeX
  const hm = field.fieldSizeY
  const gotNum = !isNil(sizeChange) && isNumber(sizeChange)
  const numSize: any = sizeChange
  const blockWidth = w / wm
  const blockHeight = h / hm
  const actualWidth = gotNum ? numSize : blockWidth
  const actualHeight = gotNum ? numSize : blockHeight
  const posInfluenceX = gotNum ? randomNum(0, blockWidth - actualWidth) : 0
  const posInfluenceY = gotNum ? randomNum(0, blockHeight - actualHeight) : 0
  return {
    position: "absolute" as "absolute",
    width: `${actualWidth}px`,
    height: `${actualHeight}px`,
    left: `${(t.xPos * blockWidth) + posInfluenceX}px`,
    top: `${Math.abs(t.yPos * blockHeight) + posInfluenceY}px`
  }
}

export {
  getPositionForTile
}
