CREATE TABLE public."Pet"
(
    id_pet SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    nome VARCHAR(15) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    raca VARCHAR(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    observacoes TEXT NOT NULL,

    CONSTRAINT fk_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES public."Clientes"(id_cliente)
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pet"
    OWNER to postgres;
