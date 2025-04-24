const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const jwt = require("jsonwebtoken");

describe("Testando rota /api/pessoas", () => {

    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    const expectedPessoas = {
      nome: "João Silva",
      cpf_cnpj: "12345678900",
      tipo: "F",
      nascimento: "2000-01-01T02:00:00.000Z",
      genero: "M",
      telefone: "31912345678",
      email: "joao@silva.com.br",
      endereco: "Rua Julio Cesar",
      endereco_num: 100,
      endereco_comp: null,
      endereco_bairro: "Imperadores",
      cidade: "Belo Horizonte",
      estado: "MG",
      pais: "Brasil",
      cep: 31000100,
    };
  
    it(`POST /api/pessoas deve retornar: "Pessoa criada com sucesso" e o objeto da requisição`, async () => {
      const res = await request(app)
        .post("/api/pessoas")
        .set("Authorization", `Bearer ${token}`)
        .send(expectedPessoas);
      console.log("✅ Retornou:", JSON.stringify(res.body, null, 2));
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Pessoa criada com sucesso");
      expect(res.body.user).toMatchObject(expectedPessoas);
    });
  
  });