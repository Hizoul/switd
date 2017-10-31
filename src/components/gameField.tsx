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
    this.props.fieldToRender.registerComponentToUpdate(this.setState)
  }
  public componentWillUnmount() {
    this.props.fieldToRender.registerComponentToUpdate(noOp)
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
