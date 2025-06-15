# Front-end Móvel

O projeto tem como objetivo fornecer uma interface mobile intuitiva, acessível e responsiva para a gestão de um pet shop. Através do front-end mobile, os usuários poderão realizar operações como consulta e cadastro de pets, clientes e agendamentos. O design e a usabilidade foram pensados para otimizar o fluxo de trabalho, facilitar o acesso às informações e garantir uma experiência agradável, prática e segura aos usuários em dispositivos móveis

## Projeto da Interface
[Descreva o projeto da interface móvel da aplicação, incluindo o design visual, layout das páginas, interações do usuário e outros aspectos relevantes.]

### Wireframes

[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual

[Descreva o estilo visual da interface, incluindo paleta de cores, tipografia, ícones e outros elementos gráficos.]

## Fluxo de Dados

[Diagrama ou descrição do fluxo de dados na aplicação.]

## Tecnologias Utilizadas

[Lista das tecnologias principais que serão utilizadas no projeto.]

## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

1. Casos de Teste

Funcionais: Testar cadastro de pets, compra de produtos, agendamento de consultas e pesquisa de produtos/serviços.

# Plano de Testes de Software

## Requisitos Funcionais

## [RF-001](./contexto.md#rf-001): Permitir que o usuário ou administrador edite um pet
> ### CT-001: Atualizar as informações de um pet com dados válidos
- Pré condições: O pet já deve existir no sistema.
- Passos:
  1. Logue no sistema, clique em pets na coluna lateral da esquerda.
  2. Procure o pet que deseja editar e clique no botão editar deste.
  3. Preencha os campos que deseja editar e clique em atualizar pet.
- Resultado esperado: Os dados enviados são atualizados e as novas informações já aparecem na lista.


## [RF-002](./contexto.md#rf-002): Permitir que o administrador delete um cliente.
> ### CT-002: Deletar um cliente do sistema.
- Pré condições: Precisará de uma conta com role de administrador.
- Passos:
  1. Logue no sistema e clique em pessoas na coluna lateral da esquerda.
  2. Procure o cliente desejado na tabela e clique no botão deletar deste cliente.
- Resultado esperado: Aparece um alert do navegador dizendo que o cliente foi deletado com sucesso.


## [RF-005](./contexto.md#rf-005): Permitir que o administrador cadastre um usuário.
> ### CT-003: Cadastrar um novo usuário no sistema.
- Pré condições: Precisará de uma conta com role de administrador.
- Passos:
  1. Logue no sistema e clique em usuários na coluna lateral da esquerda.
  2. Clique no botão novo usuário, no canto superior direito.
  3. Preencha o formulário com dados válidos e selecione a role do usuário.
  4. Clique no botão cadastrar
- Resultado esperado: Aparece um alert do navegador dizendo que o usuário foi criado com sucesso.
![USER1](img/USER_MOBILE1.png)
![USER2](img/USER_MOBILE2.png)

## [RF-006](./contexto.md#rf-006): Permitir que o usuário visualize todos agendamentos.
> ### CT-004: Ler os agendamentos do sistema.
- Pré condições: Existir agendamentos no sistema.
- Passos:
  1. Logue no sistema e clique em agendamentos na coluna lateral da esquerda.
  2. Aparecerá uma tabela com todos agendamentos existentes no sistema.
- Resultado esperado: Lista todos agendamentos existentes em uma tabela com paginação.
![AGENDAMENTOS1](img/AGENDAMENTO_MOBILE1.png)


# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
