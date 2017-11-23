import { keys } from "lodash"
import runExperiment from "../src/evaluate/experiment"
import { experimentChoices } from "../src/logic/map"
import { createMap as createtestMap3 } from "../src/maps/testMap3"

it("results of evaluation ", async () => {
  const resa = await runExperiment(createtestMap3, 0.5)
  expect(resa.length).toBe(keys(experimentChoices).length)
  const res = resa[0].results
  expect(res.runtime > 0).toBeTruthy()
  expect(res.deadAntPercentage > 0).toBeTruthy()
  expect(res.deadAntPercentage < 1).toBeTruthy()
  expect(res.deadAnts > 0).toBeTruthy()
  expect(res.spawnedAnts > 0 && res.spawnedAnts > res.deadAnts).toBeTruthy()
  expect(res.tickAmount > 0).toBeTruthy()
})
