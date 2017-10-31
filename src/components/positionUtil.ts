import Map from "../logic/map"
import Tile from "../logic/tile"

export interface IWindowDimensions {
  width: number
  height: number
}

const windowToUse: any = typeof(window) === "undefined" ? {
  innerWidth: 100,
  innerHeight: 100
} : window

const getPositionForTile = (t: Tile, field: Map) => {
  const w = windowToUse.innerWidth
  const h = windowToUse.innerHeight
  const wm = field.fieldSizeX
  const hm = field.fieldSizeY
  const blockWidth = w / wm
  const blockHeight = (h / hm)
  return {
    width: `${blockWidth}px`,
    height: `${blockHeight}px`,
    left: `${t.xPos * blockWidth}px`,
    top: `${Math.abs(t.yPos * blockHeight)}px`
  }
}

export {
  getPositionForTile
}
