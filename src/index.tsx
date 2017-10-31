import * as React from "react"
import * as ReactDOM from "react-dom"
import DisplayGame from "./components/gameField"
import testMap1 from "./maps/testMap1"

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
