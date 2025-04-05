const request = require("supertest");
const express = require("express");
const { getPets, createPet } = require("../controllers/petController");
const Pet = require("../models/petModel");

jest.mock("../models/petModel"); 

const app = express();
app.use(express.json());


app.get("/pets", getPets);
app.post("/pets/new-pet", createPet);

describe("Tests for Pet Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test("GET /pets - Retorna todos os pets", async () => {
    Pet.findAll.mockResolvedValue([
      {
        id: 1,
        nome: "Rex",
        tipo: "Cachorro",
        raca: "Labrador",
        data_nascimento: "2020-01-15",
        observacoes: "Muito brincalhão",
        pessoa_id: 1,
      },
    ]);

    const response = await request(app).get("/pets");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].nome).toBe("Rex");
    expect(Pet.findAll).toHaveBeenCalled();
  });

  test("POST /pets/new-pet - Cria um novo pet", async () => {
    const newPet = {
      nome: "Rex",
      tipo: "Cachorro",
      raca: "Labrador",
      data_nascimento: "2020-01-15",
      observacoes: "Muito brincalhão e adora passear.",
      pessoa_id: 1,
    };

    Pet.create.mockResolvedValue({ id: 1, ...newPet });

    const response = await request(app).post("/pets/new-pet").send(newPet);

    expect(response.status).toBe(201);
    expect(response.body.pet.nome).toBe("Rex");
    expect(Pet.create).toHaveBeenCalledWith(newPet);
  });
});