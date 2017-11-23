import Map, { experimentChoices } from "../../logic/map"
import Street, { direction } from "../../logic/street"
import Tower from "../../logic/tower"

const createMap = () => {
  const testMapNoSplits = new Map(12, 12)
  testMapNoSplits.spawnThreshold = 14
  testMapNoSplits.experimentType = experimentChoices.shortestPathOnly
  const start = new Street(0, 0, testMapNoSplits)
  testMapNoSplits.addTile(start)
  const s1 = start.extend(direction.right)
  const s2 = s1.extend(direction.down)
  const s3 = s2.extend(direction.down)
  const s4 = s3.extend(direction.down)
  const s5 = s4.extend(direction.down)
  const s6 = s5.extend(direction.down)
  const s7 = s6.extend(direction.down)
  const s8 = s7.extend(direction.down)
  const s9 = s8.extend(direction.down)
  const s10 = s9.extend(direction.down)
  const s11 = s10.extend(direction.down)
  const s12 = s11.extend(direction.down)

  const ls = s3.extend(direction.right)
  ls.relevantEvaluationTarget = true
  const ls1 = ls.extend(direction.right)
  const ls2 = ls1.extend(direction.down)
  const ls3 = ls2.extend(direction.down)
  const ls4 = ls3.extend(direction.down)
  const ls5 = ls4.extend(direction.down)
  const ls6 = ls5.extend(direction.down)
  const ls7 = ls6.extend(direction.down)
  const ls8 = ls7.extend(direction.down)
  const ls9 = ls8.extend(direction.left)

  ls9.addIntersection(s10)

  const t2 = new Tower(0, 5 , testMapNoSplits)
  testMapNoSplits.addTile(t2)
  const t5 = new Tower(4, 4, testMapNoSplits)
  testMapNoSplits.addTile(t5)
  return testMapNoSplits
}

export default createMap()
export { createMap }
