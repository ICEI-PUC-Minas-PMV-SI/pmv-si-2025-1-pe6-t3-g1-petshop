const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const jwt = require("jsonwebtoken");


describe("Testando rota /api/schedule/create", () => {

  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });


  const expectedSchedule = {
    pessoa: "Carlos Alberto",
    profissional: "Guilherme Augusto ",
    pet: "Dinossauro",
    data_agendamento: "2025-10-10T03:00:00.000Z",
    servico: "Banho e tosa",
  };


  it(`POST /api/schedule/create deve retornar: "Agendado com sucesso" e o objeto da requisição`, async () => {
    const res = await request(app)
      .post("/api/schedule/create")
      .set("Authorization", `Bearer ${token}`)
      .send(expectedSchedule);
    console.log("✅ Retornou:", JSON.stringify(res.body, null, 2));
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Agendado com sucesso");
    expect(res.body.schedule).toMatchObject(expectedSchedule);
  });

});


