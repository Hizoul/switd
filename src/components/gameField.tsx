import { map } from "lodash"
import * as React from "react"
import Map from "../logic/map"
import Tile from "../logic/tile"
import noOp from "../noOp"
import AntDisplay from "./ant"
import StreetDisplay from "./street"
import "./style.css"
import TowerDisplay from "./tower"

const componentWillUnmount = (thisRef: any) => {
  thisRef.props.fieldToRender.registerComponentToUpdate({setState: noOp})
  thisRef.props.fieldToRender.stopTimer()
}

class GameFieldDisplay extends React.Component<{
  fieldToRender: Map
}, any> {
  public state: {tickNum: number} = {tickNum: -1}
  constructor(props: any) {
    super(props)
    this.componentWillUnmount = componentWillUnmount.bind(this, this)
  }
  public componentWillMount() {
    this.props.fieldToRender.registerComponentToUpdate(this)
    this.props.fieldToRender.startTimer()
  }
  public render() {
    const streets = map(this.props.fieldToRender.streetList,
      (street) => <StreetDisplay street={street} gameField={this.props.fieldToRender} />)
    const towers = map(this.props.fieldToRender.towerList,
      (tower) => <TowerDisplay tower={tower} gameField={this.props.fieldToRender} />)
    const ants = map(this.props.fieldToRender.antList,
      (ant) => <AntDisplay ant={ant} gameField={this.props.fieldToRender} />)
    return (
      <div className="gameField">
        {streets}
        {towers}
        {ants}
      </div>
    )
  }
}

export default GameFieldDisplay
export {
  componentWillUnmount
}
