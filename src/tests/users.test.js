const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const jwt = require("jsonwebtoken");

describe("Testando rota /api/users/3/delete", () => {

    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    const expectedDeletedUser = {
      id: 3,
      nome: "davi",
      email: "davi",
      senha_hash: "davi",
      telefone: "davi",
      created_at: "2025-10-10T03:00:00.000Z",
      updated_at: "2025-10-10T03:00:00.000Z",
    };
  
    it(`DELETE /api/:id/delete deve retornar: "Usuário deletado com sucesso" e o objeto da requisição`, async () => {
      const res = await request(app)
        .delete("/api/users/3/delete")
        .set("Authorization", `Bearer ${token}`);
      console.log("✅ Retornou:", JSON.stringify(res.body, null, 2));
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Usuário deletado com sucesso");
      expect(res.body.user).toMatchObject(expectedDeletedUser);
    });
  
  });