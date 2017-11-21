import * as React from "react"
import * as ReactDOM from "react-dom"
import "velocity-animate"
import "velocity-animate/velocity.ui"
import GameFieldController from "./components/controller"
import DisplayGame from "./components/gameField"
import testMap1 from "./maps/mapWithShortAndLongPath"

const mapToRender = testMap1
// TODO: SYNC number update with ant movage
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
