# MOBIWOUND

Gestão digital de feridas para profissionais de saúde

## Getting Started

Estas instruções vão permitir que fique com uma cópia do projeto de maneira a correr na sua máquina local e smartphone para efeitos de desenvolvimento e testes.

### Pré-requisitos

Precisa da instalar no computador (macOS):

* Node.js (LTS)
* Cordova
* Ionic Framework

### Instalação

Primeiro tem de instalar o [Node.js (LTS)](https://nodejs.org). De seguida, instale o Cordova:

```
$ sudo npm install -g cordova
```

Depois de instalado o Cordova, instale o Ionic framework:

```
$ sudo npm install -g ionic
```


## Testar com o smartphone

Instale a aplicação [Ionic DevApp](https://play.google.com/store/apps/details?id=io.ionic.devapp&hl=pt_PT). Abra o terminal e situe-se no diretório do projeto. Por exemplo:

```
MBP-de-Alex-2:mobiwound alex$ 
```
A partir deste projeto, para testar a aplicação, execute o comando 

```
$ ionic serve -c
```

Para testar a aplicação no browser pode também executar o comando

```
$ ionic serve --lab
```

## Problemas conhecidos

Caso esteja a fazer o seu primeiro build, é provavel encontrar um erro relacionado com a função "Morris". Para ultrapassar este erro, basta dar um *enter* na página *patienthr.ts* acima da função *patientDataFunction()*.

## Authors

* **Alex Faria** - Estagiário
* **Samuel Frade** - Orientador de estágio
* **Diogo Cabral** - Supervisor

## Acknowledgments

* Universidade da Madeira
* BinaryScope Solutions

