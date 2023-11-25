# Decentralized Voting Application (DApp)

A decentralized voting application that integrates with the Ethereum blockchain, MetaMask for user authentication, and Discord for real-time notifications and interactions.
The project uses NestJS for the backend and ReactJS for the frontend.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment) 
  - [Deployed Instances](#deployed-instances)
- [License](#license)

## Introduction

Welcome to the Decentralized Voting Application (DApp). This project empowers users to participate in decentralized voting on the Ethereum blockchain, utilizing MetaMask for secure user authentication and Discord for real-time notifications and interactions.

## Features

- **Decentralized Voting:** Users can securely cast their votes on the Ethereum blockchain.
- **MetaMask Integration:** Seamless user authentication using MetaMask.
- **Real-time Discord Notifications:** Stay informed with real-time notifications and interactions on Discord.
- **NestJS Backend:** A robust backend built with NestJS for handling business logic and Ethereum interactions.
- **Hardhat Deployment:** Smart contracts are deployed using Hardhat for Ethereum blockchain interactions.
- **ReactJS Frontend:** A user-friendly frontend built with ReactJS for an interactive voting experience.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [NestJS](https://nestjs.com/)
- [Hardhat](https://hardhat.org/)
- [ReactJS](https://reactjs.org/)

### Installation

Clone the repository and install dependencies:

```bash

    git clone https://github.com/iamnas/Decentralized-Voting-System.git
    cd Decentralized-Voting-System

```


#### 1. Backend (NestJS)

Navigate to the `backend` directory and install dependencies:

```bash

  cd backend
  npm install

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


#### 2. Smart Contracts (Hardhat)

Navigate to the `contract` directory and install dependencies:

```bash

cd contract
npm install

```

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node

npx hardhat run --network <network-name > scripts/deploy.ts 
npx hardhat run --network sepolia scripts/deploy.ts 

```

## Test

```bash
# unit tests
$ npx hardhat test

```

##### 3. Frontend (ReactJS)

Navigate to the `frontend` directory and install dependencies:

```bash

  cd frontend
  npm install

```

## Deployment

## Deployed Instances

- **Backend:** [https://backend-one-mu.vercel.app/](https://backend-one-mu.vercel.app/)
- **Frontend:** [https://decentralized-voting-application.vercel.app/](https://decentralized-voting-application.vercel.app/)


## License

This project is licensed under the MIT License.
