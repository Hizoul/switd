import { get } from "lodash"
import * as React from "react"
import { VelocityComponent } from "velocity-react"
import Ant from "../logic/ant"
import Map from "../logic/map"
import { getPositionForTile } from "./positionUtil"

class GameFieldInput extends React.Component<{
  gameField: any
  propKey: string
  label: string
  type?: string
  step?: string
}, any> {
  public render() {
    return (
      <div className="inputLabelCombo">
        <span>{this.props.label}</span>
        <input
          type={this.props.type}
          step={this.props.step}
          value={this.props.gameField[this.props.propKey]}
          onChange={((newVal) => {
            let searchKey = "nativeEvent.currentTarget.value"
            if (this.props.type === "checkbox") {
              searchKey = "nativeEvent.currentTarget.checked"
            }
            let valToSet = get(newVal, searchKey)
            if (this.props.type === "number") {
              valToSet = Number(valToSet)
            }
            this.props.gameField[this.props.propKey] = valToSet
          })}
        />
      </div>
    )
  }
}

export default GameFieldInput
