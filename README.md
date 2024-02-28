# SUGameS
This is a vulnerable web app for the SUGUS CTF 2024. You should not copy-paste this app, because it has serious easy-to-exploit vulnerabilities.

## Run in a container
If you want to run this vulnerable web app, first, you have to create the docker image. 
You first need to create a `.env` file in the `./backend` folder, with 3 lines:

```
MONGODB_URI=<url_to_mongodb>
PORT=<port>
SECRET=<your_db_user_password>
```
You should form the URI using the mongodb user and password from the `docker-compose.yml` file. `cd` to the root folder of this project and run:

```bash
docker-compose up -d
```
