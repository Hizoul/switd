import { keys } from "lodash"
import runExperiment from "../src/evaluate"
import { experimentChoices } from "../src/logic/map"
import { createtestMap3 } from "../src/maps/testMap3"

it("results of evaluation ", () => {
  const resa = runExperiment(createtestMap3, 0.5)
  expect(resa.length).toBe(keys(experimentChoices).length)
  const res = resa[0].results
  expect(res.runtime > 0).toBeTruthy()
  expect(res.deadAntPercentage > 0).toBeTruthy()
  expect(res.deadAntPercentage < 1).toBeTruthy()
  expect(res.deadAnts > 0).toBeTruthy()
  expect(res.spawnedAnts > 0 && res.spawnedAnts > res.deadAnts).toBeTruthy()
  expect(res.tickAmount > 0).toBeTruthy()
})
