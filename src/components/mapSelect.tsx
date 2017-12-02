import { find, get, isNil, map } from "lodash"
import * as React from "react"
import { VelocityComponent } from "velocity-react"
import Ant from "../logic/ant"
import Map from "../logic/map"
import { mapChanger, mapSelection } from "./mapChoiceRenderer"
import { getPositionForTile } from "./positionUtil"

class MapSelection extends React.Component<{
}, any> {
  public render() {
    let i = 0
    return (
      <div className="inputLabelCombo">
        <span>Select Map</span>
        <select
          onChange={(newVal) => {
            const newMapSel = get(newVal, "nativeEvent.currentTarget.value")
            mapChanger.updateMap(newMapSel)
          }}
        >
          {map(mapSelection, (sel) => {
            return <option value={sel.label}>{sel.label}</option>
          })}
        </select>
      </div>
    )
  }
}

export default MapSelection
