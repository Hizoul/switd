import * as React from "react"
import * as ReactDOM from "react-dom"
import "velocity-animate"
import "velocity-animate/velocity.ui"
import DisplayGame from "./components/gameField"
import testMap1 from "./maps/testMapNoSplits"

document.addEventListener(`DOMContentLoaded`, () => {
  ReactDOM.render(
  (
    <div>
      <DisplayGame fieldToRender={testMap1} />
    </div>
  ),
  document.getElementById("root")
  )
})
