import { map } from "lodash"
import * as React from "react"
import Map from "../logic/map"
import Tile from "../logic/tile"
import Tower from "../logic/tower"
import { getPositionForTile } from "./positionUtil"

class TowerDisplay extends React.Component<{
  tower: Tower
  gameField: Map
}, any> {
  public render() {
    let classes = "tower"
    if (this.props.tower.towerType) {
      classes += ` ${this.props.tower.towerType}`
    }
    const alsoDrawOn = this.props.gameField.getNeighborPositions(this.props.tower.xPos,
      this.props.tower.yPos, this.props.tower.towerRange)
    const rangeIndicator = map(alsoDrawOn, (pos) => {
      const tileToDraw = new Tile(pos.x, pos.y, 2, this.props.gameField)
      return (
        <div className="towerRangeIndicator"  style={getPositionForTile(tileToDraw, this.props.gameField)} />
      )
    })
    return (
      <div>
        <div className={classes} style={getPositionForTile(this.props.tower, this.props.gameField)}>
          <div>{this.props.tower.towerType}</div>
        </div>
        {rangeIndicator}
      </div>
    )
  }
}

export default TowerDisplay
