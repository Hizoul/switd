import * as React from "react"
import GameFieldDisplay, { componentWillUnmount } from "../../src/components/gameField"
import { renderDeterministically } from "../../src/components/positionUtil"
import { createMap as createtestMap1} from "../../src/maps/testMap1"
import { createMap as createtestMapNoSplits } from "../../src/maps/testMapNoSplits"
import noOp from "../../src/noOp"
import renderSnapshot from "../../src/testUtil/renderSnapshot"

renderDeterministically.bool = true

it("Expect GameField to be able to render the field", () => {

  const testedMap = createtestMap1()
  componentWillUnmount({props: {fieldToRender: testedMap}})
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

  const testMap2 = createtestMapNoSplits()
  renderSnapshot(<GameFieldDisplay fieldToRender={testMap2} />, "no ants yet")
  testMap2.spawnNewAnt(12)
  renderSnapshot(<GameFieldDisplay fieldToRender={testMap2} />, "12 ants at start")
  testMap2.processTick()
  testMap2.processTick()
  testMap2.processTick()
  testMap2.spawnNewAnt(3)
  testMap2.processTick()
  renderSnapshot(<GameFieldDisplay fieldToRender={testMap2} />, "12 ants at 4  3 at 1")
})
