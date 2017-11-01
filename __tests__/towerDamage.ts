import { createtestMapNoSplits } from "../src/maps/testMapNoSplits"
import noOp from "../src/noOp"
import prepSnapshotOutput from "../src/testUtil/mapSnapshot"

it("A gamefield can generate ants and let them walk in a tick", () => {
  const testedMap = createtestMapNoSplits()
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("no ants yet")
  testedMap.spawnNewAnt(5)
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("five unmoved ants")
  testedMap.processTick()
  testedMap.processTick()
  testedMap.processTick()
  testedMap.spawnNewAnt(5)
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("five ants at stage 3 5 more newly added")
  testedMap.processTick()
  testedMap.processTick()
  testedMap.processTick()
  testedMap.processTick()
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("five ants at stage 7 5 more at 4")
})
