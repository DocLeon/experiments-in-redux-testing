import 'babel-polyfill'

import chai from 'chai'

const expect = chai.expect

import configureMockStore from 'redux-mock-store'

import nock from 'nock'

import fetch from 'node-fetch'

import createSagaMiddleware from 'redux-saga'

import { createStore, applyMiddleware } from 'redux'

function* fetchDataSaga(){
}

describe('fetch data', () => {
  const expectedAction = {
    type: 'FETCH_DATA'
  }
  const middleWare = createSagaMiddleware()
  const store = createStore(
    function(){},
    applyMiddleware(middleWare)
  )

  middleWare.run(fetchDataSaga)
  it ('fetches data', () => {
    expect(store.getActions()).to.contain(expectedAction)
  });
});
