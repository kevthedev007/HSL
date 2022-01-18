const request = require('supertest')
const app = require('../server/index')
const { User, Client_Details, Nutrient_Form } = require('../models/index')

describe('Auth Endpoints', () => {
  it('should create a blog', async () => {
    const res = await request(app)
      .post('/blog/add-blog')
      .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzcxZWI5LWQxMDgtNGIxMy1iMzUyLTFmOTc1ZmM0YzNjMCIsImlhdCI6MTY0MjM2MDAzMX0.eXhY8JE6qoZ5g3vcxwSUeiH_Oi53krtbtBgSW_lvFVA")
      .send({
        userId: '76653',
        title: "The big story",
        category: ["form", "catarct"],
        description: "the story of the big story"
      });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message')
  });

  it('should get all blogs', async () => {
    const res = await request(app)
      .get('/blog/')
      .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWRkMmU1LTQ2YTAtNDFhOS05OWQ4LWU3ZThlMDZmMThjMyIsImlhdCI6MTY0MTQyMDU0Nn0.aAexSv4qZSCrsIEUNVuzCjxBbtRSC1rEX55FHC3eg0o")
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('blogs')
  })

  it('should get a single blogs', async () => {
    const id = '7665675'
    const res = await request(app)
      .get(`/blog/get-blog/${id}`)
      .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzcxZWI5LWQxMDgtNGIxMy1iMzUyLTFmOTc1ZmM0YzNjMCIsImlhdCI6MTY0MjM2MDAzMX0.eXhY8JE6qoZ5g3vcxwSUeiH_Oi53krtbtBgSW_lvFVA")
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('blog')
  })

  it('should delete a blog', async () => {
    const id = '7775776'
    const res = await request(app).delete(`/blog/delete-blog/${id}`)
      .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzcxZWI5LWQxMDgtNGIxMy1iMzUyLTFmOTc1ZmM0YzNjMCIsImlhdCI6MTY0MjM2MDAzMX0.eXhY8JE6qoZ5g3vcxwSUeiH_Oi53krtbtBgSW_lvFVA")
    expect(res.statusCode).toEqual(403)
  })
})