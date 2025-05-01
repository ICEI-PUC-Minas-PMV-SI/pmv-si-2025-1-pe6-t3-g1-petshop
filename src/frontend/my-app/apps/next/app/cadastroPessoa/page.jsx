'use client';

import { useState } from 'react';
import { YStack, XStack, Input, Button, H1, Paragraph } from '@my/ui';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

export default function RegisterPessoaPage() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf_cnpj: '',
    tipo: '',
    nascimento: '',
    genero: '',
    telefone: '',
    email: '',
    status: '',
    endereco: '',
    endereco_num: '',
    endereco_comp: '',
    endereco_bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    const requiredFields = [
      'nome',
      'cpf_cnpj',
      'tipo',
      'nascimento',
      'genero',
      'telefone',
      'email',
      'status',
      'endereco',
      'endereco_num',
      'endereco_bairro',
      'cidade',
      'estado',
      'pais',
      'cep',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
    }

    try {
      const response = await fetch('/api/pessoa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        setErrorMessage('Erro ao realizar cadastro. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar realizar cadastro. Tente novamente mais tarde.');
    }
  };

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // permite crescimento com conteúdo
      width: '100%',
      backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 248, 255, 0.6), rgba(91, 155, 213, 0.5)), url("image.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    
    >
      {/* Cabeçalho */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '50px',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '0 20px',
          color: 'white',
        }}
      >
        <button
          style={{
            border: 'none',
            background: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px',
          }}
          onClick={() => (window.location.href = '/')}
        >
          <FaHome />
        </button>
        <button
          style={{
            border: 'none',
            background: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px',
          }}
          onClick={() => (window.location.href = '/login')}
        >
          <FaArrowLeft />
        </button>
      </header>

      {/* Conteúdo principal */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <YStack
          w="90%"
          maxWidth={800}
          bg="rgba(0, 0, 0, 0.65)"
          p="$6"
          borderRadius="$4"
          shadowColor="#00000033"
          shadowRadius="$2"
          gap="$4"
        >
          <H1 color="$blue10" ta="center" mb="$8">
            Cadastro de Pessoa
          </H1>

          {[[
            { placeholder: 'Nome Completo', field: 'nome' },
            { placeholder: 'CPF/CNPJ', field: 'cpf_cnpj' },
          ],
          [
            { placeholder: 'Tipo (Física/Jurídica)', field: 'tipo' },
            { placeholder: 'Data de Nascimento', field: 'nascimento', type: 'date' },
          ],
          [
            { placeholder: 'Gênero', field: 'genero' },
            { placeholder: 'Telefone', field: 'telefone' },
          ],
          [
            { placeholder: 'E-mail', field: 'email', type: 'email' },
            { placeholder: 'Status', field: 'status' },
          ],
          [
            { placeholder: 'Endereço', field: 'endereco' },
            { placeholder: 'Número', field: 'endereco_num' },
          ],
          [
            { placeholder: 'Complemento', field: 'endereco_comp' },
            { placeholder: 'Bairro', field: 'endereco_bairro' },
          ],
          [
            { placeholder: 'Cidade', field: 'cidade' },
            { placeholder: 'Estado', field: 'estado' },
          ],
          [
            { placeholder: 'País', field: 'pais' },
            { placeholder: 'CEP', field: 'cep' },
          ]].map((row, rowIndex) => (
            <XStack key={rowIndex} gap="$6" mb="$4">
              {row.map(({ placeholder, field, type = 'text' }) => (
                <Input
                  key={field}
                  placeholder={placeholder}
                  value={formData[field]}
                  onChangeText={(value) => handleChange(field, value)}
                  keyboardType={type === 'email' ? 'email-address' : 'default'}
                  flex={1}
                  style={{
                    padding: '10px',
                    fontSize: '13px',
                  }}
                />
              ))}
            </XStack>
          ))}

          <YStack h={32} jc="center" ai="center" mb="$6">
            <Paragraph
              color="$red10"
              ta="center"
              size="$2"
              style={{
                visibility: errorMessage ? 'visible' : 'hidden',
              }}
            >
              {errorMessage}
            </Paragraph>
          </YStack>

          <Button onPress={handleRegister} bg="$blue10" color="#ffffff" mb="$6">
            Cadastrar
          </Button>
        </YStack>
      </main>

      {/* Rodapé */}
      <footer
        style={{
          textAlign: 'center',
          padding: '10px 0',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          fontSize: '14px',
        }}
      >
        © 2025 PetSystem. Todos os direitos reservados.
      </footer>
    </div>
  );
}