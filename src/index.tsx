import * as React from "react"
import * as ReactDOM from "react-dom"
import "velocity-animate"
import "velocity-animate/velocity.ui"
import GameFieldController from "./components/controller"
import DisplayGame from "./components/gameField"
import testMap1 from "./maps/testMapNoSplits"

const mapToRender = testMap1

document.addEventListener(`DOMContentLoaded`, () => {
  ReactDOM.render(
  (
    <div>
      <DisplayGame fieldToRender={mapToRender} />
      <GameFieldController gameField={mapToRender} />
    </div>
  ),
  document.getElementById("root")
  )
})
