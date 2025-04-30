'use client';

import { useState } from 'react';
import { Input, Button, H1, Paragraph } from '@my/ui';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

export default function CadastroPetPage() {
  const [formData, setFormData] = useState({
    pessoa_id: '',
    nome: '',
    tipo: '',
    raca: '',
    data_nascimento: '',
    observacoes: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pessoa_id || !formData.nome || !formData.tipo || !formData.raca || !formData.data_nascimento) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch('/pets/new-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        alert('Pet criado com sucesso!');
        setFormData({
          pessoa_id: '',
          nome: '',
          tipo: '',
          raca: '',
          data_nascimento: '',
          observacoes: '',
        });
        setErrorMessage('');
      } else {
        setErrorMessage('Erro ao criar pet. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage('Erro ao criar pet. Tente novamente mais tarde.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',
        backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 248, 255, 0.6), rgba(91, 155, 213, 0.5)), url("/image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Topo preto transparente com botões */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '40px',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '0 20px',
        }}
      >
        <button
          style={{
            border: 'none',
            background: 'none',
            color: 'rgb(242, 242, 242)',
            cursor: 'pointer',
            fontSize: '24px',
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = 'rgb(242, 242, 242)';
          }}
          onClick={() => (window.location.href = '/')}
        >
          <FaHome />
        </button>
        <button
          id="btn_voltar"
          style={{
            border: 'none',
            background: 'none',
            color: 'rgb(242, 242, 242)',
            cursor: 'pointer',
            fontSize: '24px',
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = 'rgb(242, 242, 242)';
          }}
          onClick={() => (window.location.href = '/')}
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* Conteúdo principal */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <div
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '20px auto',
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Título com espaçamento ajustado */}
          <H1 style={{ color: '#007bff', textAlign: 'center', marginBottom: '' }}>
            Cadastro de Pet
          </H1>

          {/* Campos do formulário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              placeholder="ID da Pessoa"
              name="pessoa_id"
              value={formData.pessoa_id}
              onChange={handleChange}
            />
            <Input
              placeholder="Nome do Pet"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <Input
              placeholder="Tipo de Animal"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            />
            <Input
              placeholder="Raça"
              name="raca"
              value={formData.raca}
              onChange={handleChange}
            />
            <Input
              placeholder="Data de Nascimento"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              type="date"
            />
            <Input
              placeholder="Observações"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
            />
          </div>

          {/* Espaço reservado para a mensagem de erro */}
          <div style={{ height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
            <Paragraph
              style={{
                color: 'red',
                textAlign: 'center',
                visibility: errorMessage ? 'visible' : 'hidden',
              }}
            >
              {errorMessage}
            </Paragraph>
          </div>

          {/* Botão de envio */}
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              width: '100%',
              marginTop: '16px',
            }}
          >
            Cadastrar Pet
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '10px 0',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'rgb(242, 242, 242)',
          fontSize: '14px',
        }}
      >
        © 2025 PetSystem. Todos os direitos reservados.
      </footer>
    </div>
  );
}