import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });

  it('GET /health/readiness database is up', async () => {
    const res = await axios.get(`/api/health/readiness`);

    expect(res.status).toBe(200);
    expect(res.data.info.mysqlConnection.status).toEqual('up');
  });
})
