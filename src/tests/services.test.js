const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const db = require("../config/database");
const jwt = require("jsonwebtoken");

afterAll(async () => {
  await db.close();
});

describe("Testando rota /api/services/", () => {

    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    it(`GET /api/services/ deve retornar uma lista de serviços`, async () => {
      const res = await request(app)
        .get("/api/services/")
        .set("Authorization", `Bearer ${token}`)
      console.log("✅ Retornou:", JSON.stringify(res.body, null, 2));
      expect(res.statusCode).toBe(200);
    });
  
  });