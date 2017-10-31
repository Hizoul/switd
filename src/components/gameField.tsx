import { map } from "lodash"
import * as React from "react"
import Map from "../logic/map"
import Tile from "../logic/tile"
import noOp from "../noOp"
import StreetDisplay from "./street"
import "./style.css"

class GameFieldDisplay extends React.Component<{
  fieldToRender: Map
}, any> {
  public state: {tickNum: number} = {tickNum: -1}
  public componentWillMount() {
    this.props.fieldToRender.registerComponentToUpdate(this)
    this.props.fieldToRender.startTimer()
  }
  public componentWillUnmount() {
    this.props.fieldToRender.registerComponentToUpdate({setState: noOp})
    this.props.fieldToRender.stopTimer()
  }
  public render() {
    const streets = map(this.props.fieldToRender.streetList,
      (street) => <StreetDisplay street={street} gameField={this.props.fieldToRender} />)
    return (
      <div className="gameField">
        {streets}
      </div>
    )
  }
}

export default GameFieldDisplay
