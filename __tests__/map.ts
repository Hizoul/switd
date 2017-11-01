import GameField from "../src/logic/map"
import Street from "../src/logic/street"

it(`Empty Map has no occupied Fields`, () => {
  const mapUnderTest = new GameField(10, 10)
  for (let x = 0; x <= 10; x++) {
    for (let y = 0; y <= 10; y++) {
      expect(mapUnderTest.isOccupied(x, y)).toBe(null)
    }
  }
  const s1 = new Street(2, 4, mapUnderTest)
  mapUnderTest.addTile(s1)
  mapUnderTest.continueTimer = true
  mapUnderTest.processTime()
  mapUnderTest.stopTimer()
})
