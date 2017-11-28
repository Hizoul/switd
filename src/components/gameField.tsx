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

const keyFromTile = (tile: Tile) => {
  return `${tile.xPos}.${tile.yPos}`
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
    const gf = this.props.fieldToRender
    const streets = map(this.props.fieldToRender.streetList,
      (street) => <StreetDisplay street={street} key={keyFromTile(street)} gameField={this.props.fieldToRender} />)
    const towers = map(this.props.fieldToRender.towerList,
      (tower) => <TowerDisplay tower={tower} key={keyFromTile(tower)} gameField={this.props.fieldToRender} />)
    const ants = map(this.props.fieldToRender.antList,
      (ant) => <AntDisplay ant={ant} key={ant.uniqueId} gameField={this.props.fieldToRender} />)
    return (
      <div className="gameField">
        {streets}
        {towers}
        {ants}
        <div className="info">
          <div>Tick #: {gf.currentTick}</div>
          <div>Spawned Ant #: {gf.amountOfSpawnedAnts}</div>
          <div>Dead Ant #: {gf.amountOfDeadAnts}</div>
          <div>Ants that reached the Target #: {gf.getTarget().currentVisitors.length}</div>
          <div>Current Shortest Path length: {gf.shortestPathLength}</div>
          <div>Dead Ant Percentage {(gf.amountOfDeadAnts / gf.amountOfSpawnedAnts) * 100}</div>
        </div>
      </div>
    )
  }
}

export default GameFieldDisplay
export {
  componentWillUnmount
}
