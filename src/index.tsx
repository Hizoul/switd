import * as React from "react"
import * as ReactDOM from "react-dom"
import DisplayGame from "./componentsgameField"

document.addEventListener(`DOMContentLoaded`, () => {
    ReactDOM.render(
        (
            <div>
                <DisplayGame />
            </div>
        ),
        document.getElementById("root")
    )
})
