-- Tabela usuario
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    endereco_complemento VARCHAR(250),
    endereco_cidade VARCHAR (50),
    endereco_estado VARCHAR (50),
    tipo_usuario ENUM('cliente', 'empresa_parceira') NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

SHOW CREATE TABLE usuario;
-- Tabela simulacao
CREATE TABLE simulacao (
    id_simulacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    consumo_mensal_kwh DECIMAL(10, 2) NOT NULL,
    sistema_ideal_kw DECIMAL(10, 2),
    custo_estimado DECIMAL(15, 2),
    data_simulacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabela empresa_parceira
CREATE TABLE empresa_parceira (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY, 
    id_usuario INT NOT NULL, 
    nome_fantasia VARCHAR(100), 
    cnpj VARCHAR(20) UNIQUE NOT NULL, 
    descricao TEXT, 
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabela orcamento
CREATE TABLE orcamento (
    id_orcamento INT AUTO_INCREMENT PRIMARY KEY,
    id_simulacao INT NOT NULL,
    id_empresa INT, 
    id_usuario INT,
    valor_total DECIMAL(15, 2) NOT NULL,
    data_incio DATE,
    data_fim DATE,
    condicoes_pagamento TEXT,
    status ENUM('pendente', 'aceito', 'recusado') DEFAULT 'pendente',
    data_orcamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_simulacao) REFERENCES simulacao(id_simulacao),
    FOREIGN KEY (id_empresa) REFERENCES empresa_parceira(id_empresa)
);

-- Tabela material
CREATE TABLE material (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    quantidade INT,
    valor DECIMAL (10, 2)   
);

-- Tabela projeto
CREATE TABLE projeto (
    id_projeto INT AUTO_INCREMENT PRIMARY KEY,
    id_orcamento INT NOT NULL,
    data_inicio DATE,
    data_fim DATE,
    status ENUM('em_andamento', 'concluido', 'cancelado') DEFAULT 'em_andamento',
    valor_final DECIMAL(15, 2),
    FOREIGN KEY (id_orcamento) REFERENCES orcamento(id_orcamento)
);

-- Tabela projeto_material
CREATE TABLE projeto_material (
    id_projeto INT NOT NULL,
    id_material INT NOT NULL,
    quantidade INT,
    valor DECIMAL(15, 2),
    PRIMARY KEY (id_projeto, id_material),
    FOREIGN KEY (id_projeto) REFERENCES projeto(id_projeto),
    FOREIGN KEY (id_material) REFERENCES material(id_material)
);

-- Tabela projeto_tarefa
CREATE TABLE projeto_tarefa (
    id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
    id_projeto INT NOT NULL,
    tipo VARCHAR(200),
    equipe VARCHAR(100),
    descricao TEXT,
    data_tarefa DATE,
    valor_normal DECIMAL(10, 2),
    valor_extra DECIMAL(10, 2),
    valor_custo DECIMAL(10, 2),
    FOREIGN KEY (id_projeto) REFERENCES projeto(id_projeto)
);

-- Tabela projeto_tarefa_material
CREATE TABLE projeto_tarefa_material (
    id_tarefa INT NOT NULL,
    id_material INT NOT NULL,
    quantidade INT,
    observacao TEXT,
    PRIMARY KEY (id_tarefa, id_material),
    FOREIGN KEY (id_tarefa) REFERENCES projeto_tarefa(id_tarefa),
    FOREIGN KEY (id_material) REFERENCES material(id_material)
);


### 🟩 4. *Tela de Simulação*

*📄 Componentes:*

* Input: *Código da Unidade Consumidora*
* Input: *Maior consumo mensal (kWh/mês)*
* Input: *Localização completa*
* Select: *Tipo de imóvel*

  * Residencial
  * Comercial
  * Industrial
* Radio Button: *Possui espaço para instalação?*

  * Sim
  * Não
* Input: *Área disponível no telhado (m²)*
* Select: *Tipo de ligação*

  * Monofásica
  * Trifásica
* 🔽 Seção opcional: *Equipamentos Elétricos Extras*

  * Repetidor de campos (dinâmico)

    * Input: Nome do equipamento
    * Input: Potência estimada (Watts)
    * Input: Quantidade
    * Select: Previsão de uso (Imediato / Futuro)
  * 🔘 Botão: Adicionar outro equipamento
* 🔵 Botão: *Simular Sistema Ideal*

---

### 🟩 5. *Tela de Resultados da Simulação*

*📄 Informações exibidas:*

* 📊 *Tamanho estimado do sistema (kWp)*
* 📦 *Quantidade de painéis necessários*
* 💰 *Economia estimada na conta*
* 💵 *Estimativa de custo do projeto*
* 📈 *Estimativa de retorno do investimento (Payback)*

*📌 Ações:*

* 🔵 Botão: *Solicitar Proposta*
* 🔙 Botão: *Nova Simulação*

---

### 🟩 6. *Tela de Status da Proposta*

*📄 Informações exibidas:*

* 📄 Nome do projeto / simulação
* 📅 Data de envio
* 🟡 *Status:*

  * Enviado
  * Em análise
  * Concluído

*📌 Ações:*

* 🔁 Botão: *Atualizar Status*
* 🔙 Botão: *Voltar para Início*

---
