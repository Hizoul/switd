import { findIndex, get } from "lodash"
import * as React from "react"
import { VelocityComponent } from "velocity-react"
import Ant from "../logic/ant"
import Map from "../logic/map"
import ExperimentSelection from "./experimentSelection"
import GameFieldInput from "./gameFieldInput"
import MapSelection from "./mapSelect"
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
              } else {
                gf.stopTimer()
              }
            })}
          />
        </div>
        <h3>Experiment Parameters</h3>
        <GameFieldInput
          label="Stop when (checked = ants, unchecked = pheromonelevel)"
          propKey="targetIsAmountOfAnts"
          type="checkbox"
          gameField={this.props.gameField}
        />
        <GameFieldInput
          label="Stop when reach this number"
          propKey="pheromoneTarget"
          type="number"
          gameField={this.props.gameField}
        />
        <GameFieldInput
          label="Substract pheromone for deaths"
          propKey="deathInfluencesDecay"
          type="checkbox"
          gameField={this.props.gameField}
        />
        <GameFieldInput
          label="Increase Strength"
          propKey="pheromoneIncreaseStrength"
          type="number"
          step="0.001"
          gameField={this.props.gameField}
        />
        <GameFieldInput
          label="Decay Strength"
          propKey="decayStrength"
          step="0.001"
          type="number"
          gameField={this.props.gameField}
        />
        <GameFieldInput label="Spawn threshold" propKey="spawnThreshold" gameField={this.props.gameField} />
        <ExperimentSelection gameField={this.props.gameField} />
        <MapSelection />
      </div>
    )
  }
}

export default GameFieldController
