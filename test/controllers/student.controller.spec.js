const request = require('supertest');
const app = require('../../index.js');

describe('Students Endpoints', () => {

  let userCreated = {};

  it('should create a new student', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({
        names: 'Nelson',
        lastname: 'Diaz',
        email: 'nelson@gmail.com',
        phone: '23456',
        address: 'calle 72',
        school: 'INSCA',
        grade: 8
      });

    userCreated = res.body;
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch a single student', async () => {
    const studentId = userCreated._id;
    const res = await request(app).get(`/api/students/${studentId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all students', async () => {
    const res = await request(app).get('/api/students');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a student', async () => {
    const res = await request(app)
      .put(`/api/students/${userCreated._id}`)
      .send({
        id: userCreated._id,
        names: 'Nelson Eduardo',
        lastname: 'Diaz',
        email: 'nelson@gmail.com',
        phone: '23456',
        address: 'calle 72',
        school: 'INSCA',
        grade: 8
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('names', 'Nelson Eduardo');
  });

  it('should return status code 500 if id patron is violated', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({
        names: 'Nelson Eduardo',
        lastname: 'Diaz',
        email: 'nelson@gmail.com',
        phone: '23456',
        address: 'calle 72',
        school: 'INSCA',
        grade: 'grade'
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message');
  });

  it('should delete a student', async () => {
    const res = await request(app).delete(`/api/students/${userCreated._id}`);
    expect(res.statusCode).toEqual(200);
  });
});