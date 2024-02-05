# IntroWebHacking
This is a vulnerable web app for a SUGUS talk. You should not copy-paste this app, because it has serious easy-to-exploit vulnerabilities.

# Web deployment
This is the link for the web deployed in the cloud:
https://webintro-vye5vst5wq-no.a.run.app

## Run in a container
If you want to run this vulnerable web app, first, you have to create the docker image. 
You first need to create a `.env` file in the `./backend` folder, with 3 lines:

```
MONGODB_URI=<url_to_mongodb>
PORT=<port>
SECRET=<your_db_user_password>
```

`cd` to the root folder of this project and:

```bash
docker build . -t webhackintro
```

Then, run this container with 

```bash
docker run -p 80:80 webhackintro
```
## Use Atlas DB as DataBase
Go to [https://www.mongodb.com/atlas/database] and Sign in.
1) Then, create your first database.
2) Click connect.
3) Click ''MongoDB for VS Code''
4) Copy the connection string in your `.env` file, in `MONGODB_URI`
5) Copy your account password in `SECRET`
6) Go to Network Access, and permit all IPs
- Add the next IP address: `0.0.0.0/0`. This will allow all incoming IPs.
