const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const db = require("../config/database");
const jwt = require("jsonwebtoken");

afterAll(async () => {
  await db.close();
});

describe("Testando rota /api/profissionais/", () => {

    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    it(`GET /api/profissionais/ deve retornar uma lista de profissionais e suas informações`, async () => {
      const res = await request(app)
        .get("/api/profissionais/")
        .set("Authorization", `Bearer ${token}`)
      console.log("✅ Retornou:", JSON.stringify(res.body, null, 2));
      expect(res.statusCode).toBe(200);
    });
  
  });