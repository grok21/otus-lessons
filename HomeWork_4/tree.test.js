const tree = require('./tree')

test("Folder \"test\", depth = 1", () => {
  const result = { outStr: "" }
  tree('./test', 0, 1, result)
  expect(result.outStr).toBe("߅ test\n߅ innerFolder1\n߅ innerFile1.txt\n")
})

test("Folder \"test\", depth = 2", () => {
  const result = { outStr: "" }
  tree('./test', 0, 2, result)
  expect(result.outStr).toBe("߅ test\n߅ innerFolder1\n' ߅ innerFolder2\n' ߅ innerFile2.txt\n߅ innerFile1.txt\n")
})

test("Folder \"test\", depth = 3", () => {
  const result = { outStr: "" }
  tree('./test', 0, 3, result)
  expect(result.outStr).toBe("߅ test\n߅ innerFolder1\n' ߅ innerFolder2\n' ' ߅ innerFile3.txt\n' ߅ innerFile2.txt\n߅ innerFile1.txt\n")
})