import chai from 'chai'

const expect = chai.expect

const types = {
  UPLOAD_DATA: 'UPLOAD_DATA'
}

const uploadData = (data) => ({
  type: types.UPLOAD_DATA,
  data
})

describe('upload', () => {
  it('creates upload action with data to upload', () => {
    const data = {}

    const action = {
      type : types.UPLOAD_DATA,
      data
    }
    expect(uploadData(data)).to.deep.equal(action)
  })

})
