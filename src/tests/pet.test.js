const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const db = require("../config/database");
const jwt = require("jsonwebtoken");

afterAll(async () => {
  await db.close();
});

describe("Testando rota /api/pets/:id/update", () => {

    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    const expectedUpdatedPet = {
    id: 1,
    pessoa_id: 1,
    nome: "davidavi",
    tipo: "Cachorro",
    raca: "Labrador",
    data_nascimento: "2020-01-15",
    observacoes: "Nova davi"
    };

    const linesToUpdate = {
      nome: "davidavi",
      observacoes: "Nova davi"
    }
  
    it(`PATCH /api/pets/:id/update deve retornar: "Pet atualizado com sucesso" e o objeto completo da tabela pet`, async () => {
      const res = await request(app)
        .patch("/api/pets/1/update")
        .set("Authorization", `Bearer ${token}`)
        .send(linesToUpdate)
      console.log("✅ Retornou:", JSON.stringify(res.body, null, 2));
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Pet atualizado com sucesso");
      expect(res.body.pet).toMatchObject(expectedUpdatedPet);
    });
  
  });