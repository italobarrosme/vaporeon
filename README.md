<p align="center">
  <a href="" rel="noopener">
    <img width="90" height="90" src="./public/logo.png" alt="logo">
  </a>
</p>

<h3 align="center">Vaporeon — Jogo da Velha 3D</h3>

<p align="center">
  Um jogo da velha interativo em 3D construído com Next.js 15, Three.js, React Three Fiber e Zustand para persistência local.
</p>

---

## 📝 Sumário

- [📝 Sumário](#-sumário)
- [🎮 Sobre o Jogo](#-sobre-o-jogo)
- [📦 Tecnologias](#-tecnologias)
- [🚀 Como Executar](#-como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Desenvolvimento](#desenvolvimento)
  - [Usando Docker](#usando-docker)
- [🎯 Como Jogar](#-como-jogar)
  - [Controles:](#controles)
  - [Componentes Principais:](#componentes-principais)
- [📖 English Version](#-english-version)
  - [🎮 About the Game](#-about-the-game)
  - [📦 Technologies](#-technologies)
  - [🚀 How to Run](#-how-to-run)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
    - [Using Docker](#using-docker)
  - [🎯 How to Play](#-how-to-play)
    - [Controls:](#controls)
    - [Main Components:](#main-components)

## 🎮 Sobre o Jogo

Este é um jogo da velha (tic-tac-toe) em 3D interativo onde você pode clicar nos blocos para fazer suas jogadas. O jogo apresenta:

- **Interface 3D imersiva** criada com Three.js e React Three Fiber
- **Física realística** com Rapier Physics
- **Estado persistente** usando Zustand para gerenciamento local
- **Detecção automática** de vitória e empate
- **Animações suaves** e feedback visual
- **Design responsivo** otimizado para web

## 📦 Tecnologias

- **Framework**: Next.js 15.5.2 (App Router) • React 19
- **3D Engine**: Three.js 0.179 • React Three Fiber 9.3 • Drei 10.7
- **Física**: @react-three/rapier 2.1
- **Estado**: Zustand 5.0 para persistência local
- **Linguagem**: TypeScript 5.8
- **Estilização**: Tailwind CSS 4.1
- **Testes**: Vitest 3.2 • Testing Library
- **Qualidade**: ESLint 9.28 • Prettier 3.5

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd vaporeon

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Execute o servidor de desenvolvimento
npm run dev

# O jogo estará disponível em http://localhost:3002
```

### Usando Docker

```bash
# Suba os containers
npm run docker-up

# O jogo estará disponível em http://localhost:3000

# Para parar
npm run docker-down
```

## 🎯 Como Jogar

1. **Acesse** a página do jogo em `/games`
2. **Clique** nos blocos 3D para fazer sua jogada
3. **Alterne** entre X e O automaticamente
4. **Vença** alinhando 3 símbolos (horizontal, vertical ou diagonal)
5. **Reinicie** o jogo a qualquer momento

### Controles:

- **Mouse**: Clique nos blocos para jogar
- **Arrastar**: Rotacione a câmera ao redor da cena
- **Scroll**: Zoom in/out na cena

### Componentes Principais:

- **`useTicTacToe`**: Hook principal com lógica do jogo e estado
- **`Scene`**: Cena 3D que renderiza o tabuleiro e gerencia física
- **`Block`**: Componente 3D de cada célula do tabuleiro
- **`X`** e **`O`**: Componentes 3D dos símbolos dos jogadores

---

## 📖 English Version

<h3 align="center">Vaporeon — 3D Tic-Tac-Toe Game</h3>

<p align="center">
  An interactive 3D tic-tac-toe game built with Next.js 15, Three.js, React Three Fiber, and Zustand for local persistence.
</p>

### 🎮 About the Game

This is an interactive 3D tic-tac-toe game where you can click on blocks to make your moves. The game features:

- **Immersive 3D interface** created with Three.js and React Three Fiber
- **Realistic physics** with Rapier Physics
- **Persistent state** using Zustand for local management
- **Automatic detection** of wins and draws
- **Smooth animations** and visual feedback
- **Responsive design** optimized for web

### 📦 Technologies

- **Framework**: Next.js 15.5.2 (App Router) • React 19
- **3D Engine**: Three.js 0.179 • React Three Fiber 9.3 • Drei 10.7
- **Physics**: @react-three/rapier 2.1
- **State**: Zustand 5.0 for local persistence
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.1
- **Testing**: Vitest 3.2 • Testing Library
- **Quality**: ESLint 9.28 • Prettier 3.5

### 🚀 How to Run

#### Prerequisites

- Node.js 20+
- npm or yarn

#### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vaporeon

# Install dependencies
npm install
```

#### Development

```bash
# Run development server
npm run dev

# Game will be available at http://localhost:3002
```

#### Using Docker

```bash
# Start containers
npm run docker-up

# Game will be available at http://localhost:3000

# To stop
npm run docker-down
```

### 🎯 How to Play

1. **Access** the game page at `/games`
2. **Click** on 3D blocks to make your move
3. **Alternate** between X and O automatically
4. **Win** by aligning 3 symbols (horizontal, vertical, or diagonal)
5. **Restart** the game anytime

#### Controls:

- **Mouse**: Click blocks to play
- **Drag**: Rotate camera around the scene
- **Scroll**: Zoom in/out of the scene

#### Main Components:

- **`useTicTacToe`**: Main hook with game logic and state
- **`Scene`**: 3D scene that renders the board and manages physics
- **`Block`**: 3D component for each board cell
- **`X`** and **`O`**: 3D components for player symbols

---

<p align="center">
  Made with ❤️ using Next.js, Three.js, and React Three Fiber
</p>
