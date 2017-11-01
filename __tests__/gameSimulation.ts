import { createtestMap1 } from "../src/maps/testMap1"
import prepSnapshotOutput from "../src/testUtil/mapSnapshot"

it("A gamefield can generate ants and let them walk in a tick", () => {
  const testedMap = createtestMap1()
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("no ants yet")
  testedMap.spawnNewAnt(5)
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("five unmoved ants")
  testedMap.processTick()
  testedMap.spawnNewAnt(5)
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("five ants at stage 1 5 more newly added")
  testedMap.processTick()
  expect(prepSnapshotOutput(testedMap)).toMatchSnapshot("five ants at stage 2 5 more at 1")
})
