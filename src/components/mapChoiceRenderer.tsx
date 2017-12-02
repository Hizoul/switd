import { find, get, isNil, map } from "lodash"
import * as React from "react"
import { VelocityComponent } from "velocity-react"
import Ant from "../logic/ant"
import Map, { experimentChoices } from "../logic/map"
import { createMap as mirroredwithtower } from "../maps/experiment/mirroredWithTower"
import { createMap as shortAndLong } from "../maps/experiment/shortAndLong"
import { createMap as shortTowersAndLongMap } from "../maps/experiment/shortTowersAndLong"
import { createMap as squareMazeMap } from "../maps/experiment/squareMaze"
import GameFieldController from "./controller"
import DisplayGame from "./gameField"

const mapSelection = [
  {label: "Mirrored", create: mirroredwithtower},
  {label: "Short and Long", create: shortAndLong},
  {label: "Short and Long with Towers", create: shortTowersAndLongMap},
  {label: "Square Maze", create: squareMazeMap}
]

const mapChanger: any = {
  ref: {},
  updateMap: (newMapSel: any) => {
    console.log("about to update to " + newMapSel)
    let newMapCreator: any = find(mapSelection, ["label", newMapSel])
    if (isNil(newMapCreator)) {
      newMapCreator = {label: "a", create: shortAndLong}
    }
    console.log("will change now", mapChanger.ref)
    mapChanger.ref.state.mapToRender.stopTimer()
    const mapToRender = newMapCreator.create()
    mapToRender.pheromoneTarget = 400
    mapToRender.targetIsAmountOfAnts = true
    mapToRender.experimentType = experimentChoices.shortestPathWeight
    mapChanger.ref.setState({
      mapToRender
    })

  }
}

class RenderMapChoice extends React.Component<{
}, any> {
  public state = {
    mapToRender: mirroredwithtower()
  }
  constructor(props: any) {
    super(props)
    mapChanger.ref = this
  }
  public render() {
    return (
      <div>
        <DisplayGame fieldToRender={this.state.mapToRender} />
        <GameFieldController gameField={this.state.mapToRender} />
      </div>
    )
  }
}

export default RenderMapChoice
export {
  mapChanger,
  mapSelection
}
