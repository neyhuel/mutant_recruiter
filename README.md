# Reclutador de mutantes

Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar
contra los X-Mens. Por lo tanto emprendío un sistema informático para poder analizar el ADN de las personas.
Este sistema recibe la cadena de ADN digitalizada y descifra el código genético para saber si es un mutante o no.

## Requisitos
  - [Node Js v8+](https://nodejs.org/es/)
  - NPM (se instala con NodeJs)
  - [Git](https://git-scm.com/)
  - [Docker (Opcional)](https://docs.docker.com/install/)
  - [GCloud SDK (para la version cloud)](https://cloud.google.com/sdk/docs/)
  - Tener una cuenta habilitada en [Google Cloud](https://cloud.google.com/)

# Instalación
### Google Cloud
  1. Instala las herramientas de los requisitos, puedes ayudarte de [esta guía](https://cloud.google.com/appengine/docs/standard/nodejs/quickstart)
  2. Terminado de crear el proyecto en Google App Engine ya podemos clonar el [repositorio](https://github.com/neyhuel/mutant_recruiter) en nuestra PC.
```BASH
$ git clone https://github.com/neyhuel/mutant_recruiter
$ cd mutant_recruiter
```
  3. En el directorio donde se clonó el repositorio ejecutar ```$ npm install``` para instalar todas las dependencias
  4. Terminada la instalación de npm ya estamos listos para subir el proyecto al Cloud ```$ gcloud app deploy```. Este comando publica la aplicación en el Cloud y nos permite accederlo mediante una URL, la cual podemos conocer con ```$ gcloud app browse```

### NodeJS
  1. Clonar el [repositorio](https://github.com/neyhuel/mutant_recruiter)
```BASH
$ git clone https://github.com/neyhuel/mutant_recruiter
$ cd mutant_recruiter
```
  2. Cambiamos a la rama _node-js_ `$ git checkout node-js`
  3. Ejecutamos la aplicacion con `$ node app.js`

### Docker
`$ docker run -p 8000:8000 ashlamir/mutant_recruiter`

# Como usar
La aplicación posee dos endpoints:
  - `/mutant/`: recibe una cadena de ADN y responde si es mutante o no.
  - `/mutant/stats`: devuelve la cantidad de mutantes, humanos y la relacion entre ambos. Solo disponible para la versión Cloud.

## Mutant
**URL** : `/mutant`
**Method** : `POST`
**Body** :
```json
{
  "dna":["ATGCGA","AAAAAC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```

### Respuestas
- **Condition** : Es un mutante.
- **Code** : `200 OK`
- **Content** :
```json
{
  "status": 200,
  "message": "ok"
}
```
- **Condition** : Es un humano.
- **Code** : `403 Forbidden`
- **Content** :
```json
{
  "status": 403,
  "message": "Forbidden"
}
```
## Stats
- **URL** : `/mutant/stats`
- **Method** : `GET`

### Respuestas
- **Condition** : Es un mutante.
- **Code** : `200 OK`
- **Content** :
```json
{
  "count_mutant_dna": 2,
  "count_human_dna": 4,
  "ratio": 0.5
}
```
