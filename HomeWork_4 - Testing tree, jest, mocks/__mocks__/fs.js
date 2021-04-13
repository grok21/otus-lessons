const { readdirSync } = require('fs')
const path = require('path')

const fs = jest.createMockFromModule('fs')

const DIRECTORY_INCLUDES = {
  'test': ['innerFolder1', 'innerFile1'], 
  'test/innerFolder1': ['innerFolder2', 'innerFile2'],
  'test/innerFolder1/innerFolder2': ['innerFile3']
}

function readdirSync(directoryPath) {
  return DIRECTORY_INCLUDES[directoryPath] || []
}

const MOCK_FILE_INFO = {
  'test': {
    isFile: () => false,
    isDirectory: () => true
  }, 
  'test/innerFolder1': {
    isFile: () => false,
    isDirectory: () => true
  }, 
  'test/innerFile1.txt': {
    isFile: () => true,
    isDirectory: () => false
  },
  'test/innerFolder1/innerFolder2': {
    isFile: () => false,
    isDirectory: () => true
  },
  'test/innerFolder1/innerFile2.txt': {
    isFile: () => true,
    isDirectory: () => false
  },
  'test/innerFolder1/innerFolder2/innerFile3.txt': {
    isFile: () => true,
    isDirectory: () => false
  }
}

function lstatSync(directoryPath) {
  return MOCK_FILE_INFO[directoryPath]
}

fs.readdirSync = readdirSync
fs.lstatSync = lstatSync

module.exports = fs