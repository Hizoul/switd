import Map from "../logic/map"
import Street, { direction } from "../logic/street"

const createtestMap1 = () => {
  const testMap1 = new Map()
  const start = new Street(0, 0, testMap1)
  testMap1.addTile(start)
  const s1 = start.extend(direction.right)
  const s2 = s1.extend(direction.down)

  const s31 = s2.extend(direction.down)
  const s311 = s31.extend(direction.down)
  const s312 = s311.extend(direction.down)
  const s313 = s312.extend(direction.right)
  const s314intersection = s313.extend(direction.right)

  const s32 = s2.extend(direction.right)
  const s321 = s32.extend(direction.right)
  const s322 = s321.extend(direction.down)
  const s323 = s322.extend(direction.down)
  s323.addIntersection(s314intersection)
  const s4 = s314intersection.extend(direction.down)
  const s5 = s4.extend(direction.down)
  const s6 = s5.extend(direction.right)
  return testMap1
}

export default createtestMap1()
export { createtestMap1 }
