import { findIndex } from "lodash"
import * as React from "react"
import { VelocityComponent } from "velocity-react"
import Ant from "../logic/ant"
import Map from "../logic/map"
import { getPositionForTile } from "./positionUtil"

class TowerDisplay extends React.Component<{
  ant: Ant
  gameField: Map
}, any> {
  public render() {
    const classes = "ant"
    const antStyle: any = getPositionForTile(this.props.ant.currentlyOn,
      this.props.gameField, 10)
    antStyle.opacity = this.props.ant.hp <= 0 || this.props.ant.currentlyOn.isStart() ||
      this.props.ant.currentlyOn.isTarget() ? 0 : 1
    return (
      <VelocityComponent
        animation={antStyle}
      >
        <div className={classes} />
      </VelocityComponent>
    )
  }
}

export default TowerDisplay
