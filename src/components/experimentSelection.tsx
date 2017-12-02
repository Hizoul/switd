import { find, get, isNil, map } from "lodash"
import * as React from "react"
import { VelocityComponent } from "velocity-react"
import Ant from "../logic/ant"
import Map, { experimentChoices } from "../logic/map"
import { getPositionForTile } from "./positionUtil"

const experimentSelection = [
  {label: "Shortest Path Weighted", value: experimentChoices.shortestPathWeight},
  {label: "Only on shortest path", value: experimentChoices.shortestPathOnly},
  {label: "Continous Vapor", value: experimentChoices.continousVapor},
  {label: "Only On Success", value: experimentChoices.onlyOnSuccess}
]

// onlyOnSuccess: 6,
// /**
//  * Rank-based ant system (ASrank) = shortest path
//  */
// shortestPathWeight: 8,
// shortestPathOnly: 9,
// /**
//  * also called Ant colony system Algorithm
//  */
// continousVapor: 11

class ExperimentSelection extends React.Component<{
  gameField: Map
}, any> {
  public render() {
    return (
      <div className="inputLabelCombo">
        <span>Routing Strategy</span>
        <select
          onChange={(newVal) => {
            const newMapSel = Number(get(newVal, "nativeEvent.currentTarget.value", 1))
            console.log("setting experimenttype to" + typeof(newMapSel) + get(newVal, "nativeEvent.currentTarget.value", 1), newMapSel)
            this.props.gameField.experimentType = newMapSel
          }}
        >
          {map(experimentSelection, (sel) => {
            return <option value={sel.value}>{sel.label}</option>
          })}
        </select>
      </div>
    )
  }
}

export default ExperimentSelection
