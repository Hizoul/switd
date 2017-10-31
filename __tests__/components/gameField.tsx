import * as React from "react"
import GameFieldDisplay from "../../src/components/gameField"
import { createtestMap1} from "../../src/maps/testMap1"

it("Expect GameField to be able to render the field", () => {

  const testedMap = createtestMap1()
  testedMap.componentUpdateTrigger()
  expect(<GameFieldDisplay fieldToRender={testedMap} />).toMatchSnapshot("no ants yet")
  testedMap.spawnNewAnt(5)
  expect(<GameFieldDisplay fieldToRender={testedMap} />).toMatchSnapshot("five unmoved ants")
  testedMap.processTick()
  testedMap.spawnNewAnt(5)
  expect(<GameFieldDisplay fieldToRender={testedMap} />).toMatchSnapshot("five ants at stage 2 5 more newly added")
  testedMap.processTick()
  expect(<GameFieldDisplay fieldToRender={testedMap} />).toMatchSnapshot("five ants at stage 3 5 more at 1")
})
