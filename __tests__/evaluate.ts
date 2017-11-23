import evaluate from "../src/evaluate/map"
import { createMap as createtestMap3 } from "../src/maps/testMap3"

it("results of evaluation ", () => {
  const res = evaluate(createtestMap3(), 0.5)
  expect(res.runtime > 0).toBeTruthy()
  expect(res.deadAntPercentage > 0).toBeTruthy()
  expect(res.deadAntPercentage < 1).toBeTruthy()
  expect(res.deadAnts > 0).toBeTruthy()
  expect(res.spawnedAnts > 0 && res.spawnedAnts > res.deadAnts).toBeTruthy()
  expect(res.tickAmount > 0).toBeTruthy()
})
