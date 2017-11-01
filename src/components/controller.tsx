import { findIndex, get } from "lodash"
import * as React from "react"
import { VelocityComponent } from "velocity-react"
import Ant from "../logic/ant"
import Map from "../logic/map"
import { getPositionForTile } from "./positionUtil"

class GameFieldController extends React.Component<{
  gameField: Map
}, any> {
  public render() {
    const gf = this.props.gameField
    return (
      <div className="gameFieldController">
        <div className="inputLabelCombo">
          <span>Game Speed</span>
          <input
            type="range"
            id="speed"
            min={100}
            max={5000}
            value={gf.tickSpeed}
            onChange={((newVal) => {
              gf.tickSpeed = get(newVal, "nativeEvent.currentTarget.value")
            })}
          />
        </div>
        <div className="inputLabelCombo">
          <span>Spawn Threshold</span>
          <input
            id="spawn"
            min={0}
            value={gf.spawnThreshold}
            onChange={((newVal) => {
              gf.spawnThreshold = get(newVal, "nativeEvent.currentTarget.value")
            })}
          />
        </div>
        <div className="inputLabelCombo">
          <span>Run Simulation</span>
          <input
            id="run"
            type="checkbox"
            checked={gf.continueTimer}
            onChange={((newVal) => {
              const val: any = get(newVal, "nativeEvent.currentTarget.checked")
              gf.continueTimer = val
              if (val) {
                gf.startTimer()
              }
            })}
          />
        </div>
      </div>
    )
  }
}

export default GameFieldController
