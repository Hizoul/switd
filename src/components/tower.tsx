import * as React from "react"
import Map from "../logic/map"
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
    return (
      <div className={classes} style={getPositionForTile(this.props.tower, this.props.gameField)}>
        <div>{this.props.tower.towerType}</div>
      </div>
    )
  }
}

export default TowerDisplay
