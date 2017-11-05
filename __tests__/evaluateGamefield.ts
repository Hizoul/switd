import evaluate from "../src/logic/evaluate"
import { createtestMap3 } from "../src/maps/testMap3"

it("results of evaluation ", () => {
  const gf1 = createtestMap3()
  const evaluationResult = evaluate(gf1, 20)
  expect(evaluationResult.amountOfSurvivedAnts > 20).toBeTruthy()
  expect(evaluationResult.amountOfDamageDealt > 500).toBeTruthy()
  expect(evaluationResult.maximumAverageDistance > 10).toBeTruthy()
})
