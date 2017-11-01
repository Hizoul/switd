import * as React from "react"
import GameFieldDisplay from "../../src/components/gameField"
import { createtestMap1} from "../../src/maps/testMap1"
import noOp from "../../src/noOp"
import renderSnapshot from "../../src/testUtil/renderSnapshot"
it("Expect GameField to be able to render the field", () => {

  const testedMap = createtestMap1()
  renderSnapshot(<GameFieldDisplay fieldToRender={testedMap} />, "no ants yet")
  testedMap.spawnNewAnt(5)
  renderSnapshot(<GameFieldDisplay fieldToRender={testedMap} />, "five unmoved ants")
  testedMap.registerComponentToUpdate({setState: noOp})
  testedMap.processTick()
  testedMap.spawnNewAnt(5)
  renderSnapshot(<GameFieldDisplay fieldToRender={testedMap} />, "five ants at stage 2 5 more newly added")
  testedMap.registerComponentToUpdate({setState: noOp})
  testedMap.processTick()
  renderSnapshot(<GameFieldDisplay fieldToRender={testedMap} />, "five ants at stage 3 5 more at 1")
})
