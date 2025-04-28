'use client';

import { useState } from 'react';
import { YStack, Input, Button, H1, Paragraph } from '@my/ui';
import { FaHome, FaSignOutAlt } from 'react-icons/fa'; // Importando ícones do React Icons

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        setErrorMessage('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 248, 255, 0.6), rgba(91, 155, 213, 0.5)), url("image.jpg")',
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
          background: 'rgba(0, 0, 0, 0.5)', // Fundo preto transparente
          padding: '0 20px',
        }}
      >
        <button
          style={{
            border: 'none',
            background: 'none',
            color: 'rgb(242, 242, 242)',
            cursor: 'pointer',
            fontSize: '24px', // Tamanho do ícone
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
          <FaHome /> {/* Ícone de casa */}
        </button>
        <button
          id="btn_sair"
          style={{
            border: 'none',
            background: 'none',
            color: 'rgb(242, 242, 242)',
            cursor: 'pointer',
            fontSize: '24px', // Tamanho do ícone
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = 'rgb(242, 242, 242)';
          }}
          onClick={() => alert('Saindo...')}
        >
          <FaSignOutAlt /> {/* Ícone de saída */}
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
        <YStack
          w="90%"
          maxWidth={400}
          space="$4"
          bg="rgba(0, 0, 0, 0.7)" // Fundo preto transparente
          p="$4"
          borderRadius="$4"
          shadowColor="#00000033"
          shadowRadius="$2"
        >
          <H1 color="$blue10" ta="center" mb="$4">
            PetSystem
          </H1>

          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            mb="$3"
          />
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mb="$3"
          />

          {/* Espaço reservado para a mensagem de erro */}
          <YStack h={32} jc="center" ai="center" mb="$3">
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

          <Button onPress={handleLogin} bg="$blue10" color="#ffffff">
            Entrar
          </Button>
        </YStack>
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