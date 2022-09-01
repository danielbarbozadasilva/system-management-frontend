# **Front-End ReactJs Sistema REGALE**
## **Introdução**
A todo momento surgem novos estabelecimentos comerciais, muitos dos quais não têm os meios de promoção ou são de difícil localização. O Sistema REGALE possui a proposta de solucionar esse problema, com foco em confeitarias, ele permite ao usuário através de um sistema web localizar as confeitarias mais próximas da sua localidade. Assim como os produtos ofertados.

O Front-End foi desenvolvido utilizando o ReactJs.
<br/>
<br/>

A API foi desenvolvida utilizando o NodeJs, ExpressJs e o Banco de dados MongoDB. E está disponível para consulta no link abaixo:
```
git clone https://github.com/danielbarbozadasilva/system-management-backend.git
```
<br/>

## **Escopo do produto**
O Sistema tem como objetivo listar as confeitarias e gerenciá-las, possibilitando a consulta por parte dos clientes. O projeto tem como objetivo divulgar as confeitarias, principalmente aquelas que estão começando no mercado, ou que ainda não são muito conhecidas. Permitindo também ao cliente mais opções de produtos e preços.
<br/>
<br/>

## **Descrição geral**
REGALE é um sistema web que visa estabelecer um relacionamento entre o cliente e um nicho de mercado específico. Todas as suas funcionalidades foram pensadas para proporcionar conforto e comodidade aos seus usuários.

A proposta do Sistema é divulgar o estabelecimento, problema recorrente em confeitarias que estão iniciando no mercado, pois ainda não possuem uma forma eficaz de divulgação.

Além de divulgar os estabelecimentos, o Sistema disponibiliza uma interface amigável e de fácil uso por parte do usuário da plataforma. Os usuários do sistema são o administrador, o proprietário da confeitaria (fornecedor) e o cliente. Onde todos possuem acesso ao sistema de acordo com as suas credenciais e permissões. 

O Sistema permite ao Administrador gerenciar categorias, fornecedores e clientes. O proprietário da confeitaria pode gerenciar seus produtos, assim como favoritá-los. O cliente possui a opção de avaliar os fornecedores. Além disso, o Sistema possui uma tela inicial que permite ao público em geral navegar facilmente através de filtros de busca entre categorias, produtos e fornecedores.
<br/>
<br/>

## **Instalação**
Clone o repositório na pasta de sua preferência.
```
git clone https://github.com/danielbarbozadasilva/system-management-frontend.git
```

Abra a pasta do repositório clonado, e crie um arquivo ".env", exemplo:
```
REACT_APP_API=http://localhost:3011
REACT_APP_VERSION=/v1
REACT_APP_TOKEN_KEY=gestao
```

Abra a pasta do repositório clonado, e instale as dependências do projeto através do comando:
```
yarn install
```

Execute o comando para rodar o projeto:
```
yarn start
```
<br/>

# **Levantamento de requisitos**

## **Requisitos funcionais**
<br/>

RF001 – O sistema deve controlar a autenticação dos usuários.

RF002 – O sistema deve manter cadastro de clientes.

RF003 – O sistema deve manter cadastro de fornecedores.

RF004 – O sistema deve manter categorias.

RF005 – O sistema deve manter produtos.

RF006 – O sistema deve aprovar ou bloquear o acesso do fornecedor.

RF007 – O sistema deve enviar um e-mail ao fornecedor informando a ativação ou bloqueio da conta.

RF008 – O sistema deve favoritar fornecedores.

RF009 – O sistema deve favoritar produtos.

RF010 – O sistema deve listar os clientes por fornecedor.

RF011 – O sistema deve listar os fornecedores ordenados por número de curtidas e por ordem alfabética.

RF012 – O sistema deve listar os produtos por categoria.

RF013 – O sistema deve filtrar os produtos por nome e ordenação.

RF014 – O sistema deve listar os produtos por fornecedor.

RF015 – O sistema deve filtrar os fornecedores por localidade e ordem alfabética.

<br/>
<br/>

## **Requisitos não funcionais**
<br/>

| Identificação | Classificação | Descrição |
| --- | --- | --- |
|RNF001   |Implementação     | O back-end do sistema deve ser desenvolvido em NodeJs e ExpressJs.    |
|RNF002   |Implementação     | O front-end do sistema deve ser desenvolvido em ReactJs.    |
|RNF003   |Implementação     | O banco de dados a ser utilizado é o MongoDB.     |
|RNF004   |Implementação     | O sistema deve funcionar em Sistemas Operacionais Windows, Mac e Linux.    |
|  |  |  |

<br/>
<br/>

## **Regras de negócio**
<br/>

| Controle de acesso (RN001) |  |
| --- | --- |
|`Descrição:` Os acessos permitidos ao sistema serão: Administrador, Fornecedor (confeitaria) e Cliente. O usuário anônimo terá acesso apenas ao portal do site.    |
|  |

| Controle de veracidade (RN02) |  |
| --- | --- |
|`Descrição:` Apenas fornecedores autorizados pelo administrador poderão ter acesso ao sistema.    |
|  |

| Limite de ação (RN003) |  |
| --- | --- |
|`Descrição:` Apenas o Administrador poderá incluir, editar e excluir categorias no sistema.  |
|  |

| Limite de ação (RN004) |  |
| --- | --- |
|`Descrição:` Apenas o Administrador poderá visualizar informações sobre os clientes.  |
|  |

| Controle de estoque (RN005) |  |
| --- | --- |
|`Descrição:` Somente o gerente da confeitaria (fornecedor) terá permissão para incluir, alterar e excluir seus produtos no sistema.  |
|  |

| Limite de ação (RN006) |  |
| --- | --- |
|`Descrição:` Somente o gerente da confeitaria (fornecedor) terá permissão de favoritar os seus próprios produtos.   |
|  |

| Limite de ação (RN007) |  |
| --- | --- |
|`Descrição:` O gerente da confeitaria (fornecedor) terá permissão de favoritar apenas 3 (três) de seus próprios produtos.   |
|  |

| Limite de ação (RN008) |  |
| --- | --- |
|`Descrição:` Somente o cliente terá permissão de favoritar a confeitaria (fornecedor).   |
|  |

| Limite de ação (RN009) |  |
| --- | --- |
|`Descrição:` O cliente terá permissão de favoritar apenas 3 (três) fornecedores.   |
|  |

<br/>
<br/>

# **Lista de atores e casos de uso**
<br/>

## Lista de atores que interagem com o sistema:
<br/>

* Administrador
* Fornecedor (dono da confeitaria)
* Cliente
* Anônimo
<br/>
<br/>

## Lista de Casos de Uso:
<br/>

1 - Manter categorias

2 - Manter fornecedores

3 - Manter clientes

4 - Aprovar cadastro de fornecedores

5 - Manter produtos

6 - Avaliar produtos

7 - Avaliar fornecedores

8 - pesquisar categorias

9 - pesquisar produtos

10 - pesquisar fornecedores
<br/>
<br/>

## **Diagrama de Casos de uso**
<br/>
<img src="./docs/diagrama_de_casos_de_uso.png" alt="Diagrama de Casos de uso"/>

<br/>
<br/>

> ## Licença
- Licença GPLv3
<br/>
<br/>
<br/>

> ## Metodologias e Padrões
* Responsive Layout
* Conventional Commits
* Camelcase
* GitFlow
<br/>
<br/>
<br/>

> ## Bibliotecas e Ferramentas

* React
* Reach Router
* Styled-components
* Axios
* Git
* Eslint
* Prettier
* Chart
* Material UI
* React-icons
* React-redux-toastr
* React-toast
* React-bootstrap
* Redux-multi
* Redux-thunk
* React-helmet
<br/>
<br/>
<br/>

> ## React Features

* UseState
* UseContext
* UseEffect
* UseHistory
* UseParams
* Custom Hooks
* Router
<br/>
<br/>
<br/>

> ## **Telas**
<br/>

## **Tela Inicial - Categorias**
<br/>
<img src="./src/assets/img/prints/img01.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Tela de Produtos**
<br/>
<img src="./src/assets/img/prints/img02.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Tela de Fornecedores**
<br/>
<img src="./src/assets/img/prints/img03.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Tela de Login**
<br/>
<img src="./src/assets/img/prints/img04.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Tela de Cadastro de Clientes**
<br/>
<img src="./src/assets/img/prints/img05.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Tela de Cadastro de Fornecedores**
<br/>
<img src="./src/assets/img/prints/img06.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Administrador - Home**
<br/>
<img src="./src/assets/img/prints/img07.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Administrador - Manter Categorias**
<br/>
<img src="./src/assets/img/prints/img08.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Administrador - Manter Fornecedores**
<br/>
<img src="./src/assets/img/prints/img09.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Administrador - Listar Clientes**
<br/>
<img src="./src/assets/img/prints/img010.png" alt=""/>
<br/>
<br/>
<br/>
<br/>


## **E-mail Enviado ao Ativar o Fornecedor**
<br/>
<img src="./src/assets/img/prints/img023.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **E-mail Enviado ao Desativar o Fornecedor**

<br/>
<img src="./src/assets/img/prints/img24.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Fornecedor - Home**
<br/>
<img src="./src/assets/img/prints/img011.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Fornecedor - Manter Produtos**
<br/>
<img src="./src/assets/img/prints/img012.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Fornecedor - Curtidas Recebidas**
<br/>
<img src="./src/assets/img/prints/img013.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Cliente - Home**
<br/>
<img src="./src/assets/img/prints/img014.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Cliente - Avaliar Fornecedor**
<br/>
<img src="./src/assets/img/prints/img015.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Dashboard do Cliente - Curtidas Efetuadas**
<br/>
<img src="./src/assets/img/prints/img016.png" alt=""/>
<br/>
<br/>
<br/>
<br/>

## **Responsividade - IPhone XR**
<br/>

## **Tela Inicial - Categorias**
<br/>
<img src="./src/assets/img/prints/img017.png" alt="" width=350px />
<br/>
<br/>
<br/>
<br/>


## **Tela de Produtos**
<br/>
<img src="./src/assets/img/prints/img018.png" alt="" width=350px />
<br/>
<br/>
<br/>
<br/>

## **Tela de Fornecedores**
<br/>
<img src="./src/assets/img/prints/img019.png" alt="" width=350px />
<br/>
<br/>
<br/>
<br/>

## **Tela de Login**
<br/>
<img src="./src/assets/img/prints/img022.png" alt="" width=350px />
<br/>
<br/>
<br/>
<br/>

## **Tela de Cadastro de Clientes**
<br/>
<img src="./src/assets/img/prints/img020.png" alt="" width=350px />
<br/>
<br/>
<br/>
<br/>

## **Tela de Cadastro de Fornecedores**
<br/>
<img src="./src/assets/img/prints/img021.png" alt="" width=350px />
<br/>
<br/>
<br/>
<br/>