const request = require('supertest')
const app = require('../server/index')
const { User, Client_Details, Nutrient_Form } = require('../models/index')

describe('Auth Endpoints', () => {
  it('should register a new client', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: "kelvin",
        whatsapp_number: "08130785455",
        email: "kelvinhotshot@gmail.com",
        family_size: 6,
        payment_option: "mastercard",
        nickname: "sasuke",
        gender: "male",
        age: 23,
        weight: "40",
        height: "190",
        habits: ["drinking", "clubbing", "sport"],
        current_health_complaints: ["alzheimer", "arthritis", "cataract"],
        current_medication: ["sinemet", "glanil", "lexotan", "avodart"],
        health_fear: "of dying alone",
        family_history: ["alzheimer", "arthritis", "cataract"],
        allergies: ["drug allergies", "skin allergies"],
        preferred_drug_form: ["tablets", "liquid"],
        usual_health_spending: "1000 - 8000",
        proposed_monthly_budget: "1000 - 8000"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message')
  });

  it('should register an admin', async () => {
    const res = await request(app)
      .post('/auth/admin-register')
      .send({
        email: "kk@gmai.com",
        password: "UzdmbOqKgR"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message')
  })
})