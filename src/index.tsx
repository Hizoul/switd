import * as React from "react"
import * as ReactDOM from "react-dom"
import "velocity-animate"
import "velocity-animate/velocity.ui"
import DisplayGame from "./components/gameField"
import MapChoiceRender from "./components/mapChoiceRenderer"
import testMap1 from "./maps/experiment/shortTowersAndLong"

const mapToRender = testMap1
// TODO: SYNC number update with ant movage
document.addEventListener(`DOMContentLoaded`, () => {
  ReactDOM.render(
  (
    <MapChoiceRender />
  ),
  document.getElementById("root")
  )
})
