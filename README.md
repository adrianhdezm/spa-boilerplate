# SPA Boilerplate
A boilerplate for building Single-Page Applications.

## Getting Started

To get you started you can simply clone the [spa-boilerplate](https://github.com/adrianhdezm/spa-boilerplate) repository and install all its dependencies:

### Prerequisites

You need git to clone the [spa-boilerplate](https://github.com/adrianhdezm/spa-boilerplate) repository and Node.js and its package manager (NPM) installed.

### Clone the project

Clone the [spa-boilerplate](https://github.com/adrianhdezm/spa-boilerplate)  repository using [git](http://git-scm.com/):

```bash
git clone https://github.com/adrianhdezm/spa-boilerplate.git
cd spa-boilerplate
```

If you just want to start a new project without the [spa-boilerplate](https://github.com/adrianhdezm/spa-boilerplate)  commit history then you can do:

```bash
git clone --depth=1 https://github.com/adrianhdezm/spa-boilerplate.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.com).

```bash
npm install
```

## Run the Application in a development environment 
The simplest way to start this server is using the preconfigured development web server. 

```bash
npm start
```

Now browse to the app at `http://localhost:8000/`.

## Create a Bundle for the Application
This project use [webpack](https://github.com/webpack/webpack) for creating a bundle of the application and its dependencies

```bash
npm run build
```