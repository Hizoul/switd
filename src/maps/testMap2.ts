import Map from "../logic/map"
import Street, { direction } from "../logic/street"
import Tower from "../logic/tower"

const createtestMap2 = () => {
  const testMap2 = new Map()
  testMap2.spawnThreshold = 14
  const start = new Street(0, 0, testMap2)
  testMap2.addTile(start)
  const s1 = start.extend(direction.right)
  const s2 = s1.extend(direction.down)

  const s31 = s2.extend(direction.down)
  const s311 = s31.extend(direction.down)
  const s312 = s311.extend(direction.down)
  const s313 = s312.extend(direction.right)
  const s314 = s313.extend(direction.right)
  const s315intersection = s314.extend(direction.right)

  const s32 = s2.extend(direction.right)
  const s321 = s32.extend(direction.right)
  const s322 = s321.extend(direction.right)
  const s323 = s322.extend(direction.down)
  const s324 = s323.extend(direction.down)
  s324.addIntersection(s315intersection)
  const s4 = s315intersection.extend(direction.down)
  const s5 = s4.extend(direction.down)
  const s6 = s5.extend(direction.right)

  const t1 = new Tower(2, 2, testMap2)
  testMap2.addTile(t1)
  const t2 = new Tower(3, 3, testMap2)
  testMap2.addTile(t2)
  const t3 = new Tower(5, 5, testMap2)
  testMap2.addTile(t3)

  return testMap2
}

export default createtestMap2()
export { createtestMap2 }
