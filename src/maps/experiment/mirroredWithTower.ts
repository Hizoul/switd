import Map, { experimentChoices } from "../../logic/map"
import Street, { direction } from "../../logic/street"
import Tower from "../../logic/tower"

const createMap = () => {
  const testMapNoSplits = new Map(11, 12)
  testMapNoSplits.spawnThreshold = 14
  testMapNoSplits.experimentType = experimentChoices.shortestPathOnly
  testMapNoSplits.substractForDeath = true
  const start = new Street(5, 0, testMapNoSplits)
  testMapNoSplits.addTile(start)
  const s1 = start.extend(direction.down)
  const s2 = s1.extend(direction.down)
  const s3 = s2.extend(direction.down)
  const s4 = s3.extend(direction.down)

  const rs0 = s4.extend(direction.right)
  rs0.relevantEvaluationTarget = true
  const rs1 = rs0.extend(direction.right)
  const rs2 = rs1.extend(direction.down)
  const rs3 = rs2.extend(direction.down)
  const rs4 = rs3.extend(direction.down)
  const rs5 = rs4.extend(direction.down)
  const rs6 = rs5.extend(direction.left)
  const rs7 = rs6.extend(direction.left)
  const rs8 = rs7.extend(direction.down)

  const oneBeforeTarget = rs8.extend(direction.down)
  const target = oneBeforeTarget.extend(direction.down)

  const rl0 = s2.extend(direction.right)
  const rl1 = rl0.extend(direction.right)
  const rl2 = rl1.extend(direction.right)
  const rl3 = rl2.extend(direction.right)
  const rl4 = rl3.extend(direction.right)
  const rl6 = rl4.extend(direction.down)
  const rl7 = rl6.extend(direction.down)
  const rl8 = rl7.extend(direction.down)
  const rl9 = rl8.extend(direction.down)
  const rl10 = rl9.extend(direction.down)
  const rl11 = rl10.extend(direction.down)
  const rl12 = rl11.extend(direction.down)
  const rl13 = rl12.extend(direction.down)
  const rl14 = rl13.extend(direction.left)
  const rl15 = rl14.extend(direction.left)
  const rl16 = rl15.extend(direction.left)
  const rl17 = rl16.extend(direction.left)
  rl17.addIntersection(oneBeforeTarget)

  const ll0 = s2.extend(direction.left)
  const ll1 = ll0.extend(direction.left)
  const ll2 = ll1.extend(direction.left)
  const ll3 = ll2.extend(direction.left)
  const ll4 = ll3.extend(direction.left)
  const ll6 = ll4.extend(direction.down)
  const ll7 = ll6.extend(direction.down)
  const ll8 = ll7.extend(direction.down)
  const ll9 = ll8.extend(direction.down)
  const ll10 = ll9.extend(direction.down)
  const ll11 = ll10.extend(direction.down)
  const ll12 = ll11.extend(direction.down)
  const ll13 = ll12.extend(direction.down)
  const ll14 = ll13.extend(direction.right)
  const ll15 = ll14.extend(direction.right)
  const ll16 = ll15.extend(direction.right)
  const ll17 = ll16.extend(direction.right)
  ll17.addIntersection(oneBeforeTarget)

  const ls0 = s4.extend(direction.left)
  ls0.relevantEvaluationTarget = true
  const ls1 = ls0.extend(direction.left)
  const ls2 = ls1.extend(direction.down)
  const ls3 = ls2.extend(direction.down)
  const ls4 = ls3.extend(direction.down)
  const ls5 = ls4.extend(direction.down)
  const ls6 = ls5.extend(direction.right)
  ls6.addIntersection(rs7)

  const t1 = new Tower(6, 6, testMapNoSplits)
  testMapNoSplits.addTile(t1)
  const t2 = new Tower(9, 6, testMapNoSplits)
  testMapNoSplits.addTile(t2)

  return testMapNoSplits
}

export default createMap()
export { createMap }
