const data = require('./data')
const $ = require('jquery')

function _getData () {
  try {
    let results = data.getnewAppsCount()
    console.log(results)
  } catch (error) {
    console.log(error)
  }
}

function _registerEventHandlers () {
  $('#new-apps-button').on('click', _getData)
}

_registerEventHandlers()
