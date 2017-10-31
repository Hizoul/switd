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
    return (
      <div className={classes} style={getPositionForTile(this.props.street, this.props.gameField)}>
        <div>{this.props.street.currentVisitors.length}</div>
      </div>
    )
  }
}

export default StreetDisplay
