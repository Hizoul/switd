import { isNil } from "lodash"
import GameField from "../src/logic/map"
import Street from "../src/logic/street"

it(`Streets can be placed in Map and extended`, () => {
  const mapUnderTest = new GameField(10, 10)
  const s1 = new Street(3, 6, mapUnderTest)
  expect(s1.isStart()).toBe(true)
  expect(s1.isTarget()).toBe(true)
  const s2 = s1.extend(2)
  expect(!isNil(s2)).toBe(true)
  if (!isNil(s2)) {
    expect(s1.isStart()).toBe(true)
    expect(s1.isTarget()).toBe(false)
    expect(s2.isStart()).toBe(false)
    expect(s2.isTarget()).toBe(true)
    const s3 = s2.extend(2)
    expect(!isNil(s3)).toBe(true)
    if (!isNil(s3)) {
      expect(s1.isStart()).toBe(true)
      expect(s1.isTarget()).toBe(false)
      expect(s2.isStart()).toBe(false)
      expect(s2.isTarget()).toBe(false)
      expect(s3.isStart()).toBe(false)
      expect(s3.isTarget()).toBe(true)
    }
  }
})
