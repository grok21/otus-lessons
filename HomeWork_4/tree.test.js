const tree = require('./tree')

jest.mock('fs')





jest.unmock('fs')

describe("Tests without filesystem mock", () => {
  const result = { outStr: "" }
  
  beforeEach(() => {
    result.outStr = ""
  })

  test("Folder \"test\", depth = 1", () => {
    tree('./test', 0, 1, result)
    expect(result.outStr).toBe("߅ test\n' ߅ innerFolder1\n' ߅ innerFile1.txt\n")
  })

  /*
  test("Folder \"test\", depth = 2", () => {
    tree('./test', 0, 2, result)
    expect(result.outStr).toBe("߅ test\n' ߅ innerFolder1\n' ' ߅ innerFolder2\n' ' ߅ innerFile2.txt\n' ߅ innerFile1.txt\n")
  })

  test("Folder \"test\", depth = 3", () => {
    tree('./test', 0, 3, result)
    expect(result.outStr).toBe("߅ test\n' ߅ innerFolder1\n' ' ߅ innerFolder2\n' ' ' ߅ innerFile3.txt\n' ' ߅ innerFile2.txt\n' ߅ innerFile1.txt\n")
  })
  */
})