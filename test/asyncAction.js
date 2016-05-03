import chai from 'chai'

const expect = chai.expect

import thunk from 'redux-thunk'

import configureMockStore from 'redux-mock-store'

import nock from 'nock'

import fetch from 'node-fetch'

const types = {
  FETCH_DATA: 'FETCH_DATA',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAILURE'
}

const fetchDataFromRemoteSource = () => ({
  type: types.FETCH_DATA
})

const dataFetchedSuccessfully = () => ({
  type: types.SUCCESS
})

const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataFromRemoteSource())
    return fetch('http://dataSource.com/getData')
      .then(() => {
        dispatch(dataFetchedSuccessfully())
      })
      .catch(ex => {
          dispatch({
              type: types.FAIL
            })
        }
      )
  }
}

const middlewares = [ thunk ]
const fakeStore = configureMockStore(middlewares)

describe('async action with thunk', () => {
  const store = fakeStore({})
  const expectedAction = {
    type: 'FETCH_DATA'
  }
  const successAction = {
    type: types.SUCCESS
  }
  const failureAction = {
    type: types.FAIL
  }

  describe('for a successful fetch', () => {
    nock('http://dataSource.com')
      .get('/getData')
      .reply(200,{ body : {}})

    store.dispatch(fetchData())
    it('fetches data', () => {
      expect(store.getActions()).to.contain(expectedAction)
    })

    it('reports a successful fetch', () => {
      expect(store.getActions()).to.contain(successAction);
    })
  })

  describe('for a fetch that fails', () => {
    store.dispatch(fetchData())
    it('fetches data', () => {
      expect(store.getActions()).to.contain(expectedAction)
    })

    it('reports a failed fetch', () => {
      expect(store.getActions()).to.contain(failureAction);
    })
  })

})
