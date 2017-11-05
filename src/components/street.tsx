import * as React from "react"
import Map from "../logic/map"
import Street from "../logic/street"
import { getPositionForTile } from "./positionUtil"

class StreetDisplay extends React.Component<{
  street: Street
  gameField: Map
}, any> {
  public render() {
    let classes = "street"
    if (this.props.street.isTarget()) {
      classes += " isTarget"
    }
    if (this.props.street.isStart()) {
      classes += " isStart"
    }
    const cssStyle: any = getPositionForTile(this.props.street, this.props.gameField)
    if (!this.props.street.isStart() && !this.props.street.isTarget()) {
      cssStyle.backgroundColor = `rgba(0, 0, 0, ${this.props.street.pheromoneLevel / 40})`
    }
    return (
      <div className={classes} style={cssStyle}>
        <div>{this.props.street.currentVisitors.length}</div>
      </div>
    )
  }
}

export default StreetDisplay
