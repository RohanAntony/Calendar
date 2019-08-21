# Calendar
Implementing a complex component such as calendar using the react framework.


### Setup

#### FrontEnd
- `npm install -g sass` to install the SASS preprocessor for CSS.
- `sass scss:public\css` to generate all necessary css files before deployment.
- Create a file `config.json` under `src` directory and add following to it `{ "api_key": "<value>" }`
- `npm start` to serve the files and view the calendar

#### BackEnd (Database)
- `sudo -u postgres psql` to login to postgres inorder to create DB and User
- `CREATE DATABASE <db_name>;` to create db inside `postgres` shell. Remember the semicolons.
- `CREATE USER <user_name> WITH PASSWORD '<user_password>';` to create user and password.
- Run below four commands on user
	- `ALTER ROLE <user_name> SET client_encoding TO 'utf8';`
	- `ALTER ROLE <user_name> SET default_transaction_isolation TO 'read committed';`
	- `ALTER ROLE <user_name> SET tiemzone TO 'UTC';`
	- `GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <user_name>;`
- Quit `postgres` shell using `\q`

#### Backend (Application)
- `sudo apt-get install python3-venv` to install virtual environment support
- Create a folder where you want to store the files and enter into folder.
- `python3 -m venv ./venv` will create a venv folder which setups the virtual environment.
- `source ./venv/bin/activate` will activate the virtual environment.
- Run `pip install` on necessary frameworks especially
	- `django` (base django)
	- `djangorestframework` (rest framework of django)
	- `psycopg2` (postgres database connector)
	- `django-cors-headers` (OPTIONAL: if using `corsheaders`)
- Run `git clone <git_repository_location>` to clone the repo into the respective folder.
- Add a `local_settings.py` in your project directory alongside `settings.py` to import and override default settings that are visible on github and specific to the server such as
	- `SECRET_KEY`
	- `ALLOWED_HOSTS`
	- `DEBUG`
	- `DATABASES`
- Run `python manage.py makemigrations` and `python manage.py migrate` to create the tables and fields which are necessary.
- Run `python manage.py createsuperuser` and create a superuser

#### Backend (Running test)
- Run `sudo ufw allow 8080` to add port 8080 to firewall
- Run `python manage.py runserver 0.0.0.0:8080` to run the server listening on port 8080

#### Backend (With gunicorn)
- Run `pip install gunicorn` inside virtual environment to setup.
- Run `gunicorn --bind 0.0.0.0:8080 <ProjectFolder>.wsgi` to test run the gunicorn files to check if its being served
- Deactivate virtual environment
- Add the below lines in `/etc/systemd/system/<project>.socket`
	```
	[Unit]
	Description=gunicorn.socket

	[Socket]
	ListenStream=/run/caliary.sock

	[Install]
	WantedBy=sockets.target
	```
- Add the below lines in `/etc/systemd/system/<project>.service`
	```
	[Unit]                                     
	Description=<project> daemon                
	Requires=<project>.socket                    
	After=network.target                       

	[Service]                                  
	User=<username>
	Group=www-data                             
	WorkingDirectory=<path for project location which contains manage.py>
	ExecStart=/usr/bin/gunicorn \              
	          --access-logfile - \             
	          --workers 3 \                    
	          --bind unix:/run/<project>.sock \  
	          <folder containing wsgi>.wsgi:application             

	[Install]                                  
	WantedBy=multi-user.target                 
	```
- Start gunicorn socket by running `sudo systemctl start <project>.socket`
- Enable socket by running `sudo systemctl enable <project>.socket`
- View status by running `sudo systemctl status <project>.socket`
- Verify that `<project>.sock` file is created under `/run`

#### Backend (Nginx)
- Add below content to `/etc/nginx/sites-available/<project>`
	```
	server {
	    listen 80;
	    server_name caliary.rantony.com;
	    error_log /var/log/nginx/caliary.nginx.log;

	#    location = /favicon.ico { access_log off; log_not_found off; }

	#    location / {
	#        root <location for your static file being served>;
	#    }

	    location /api {
	        include proxy_params;
	        proxy_pass http://unix:/run/<project>.sock/api;
	    }
	}
	```
- Create a symbolic link from `sites-available` to `sites-enabled` using
	`sudo ln -s /etc/nginx/sites-available/<project> /etc/nginx/sites-enabled`
- Verify if nginx is working with `sudo nginx -t`
- Restart nginx with `sudo systemctl restart nginx`

#### Backend (Nginx SSL)
- Run `sudo certbot certonly --webroot -w <project location> -d <domain name> -d <another domain name>`
- Certificates will be installed in `/etc/letsencrypt/live/<domain name>`
	- `privkey.pem` (private key)
	- `cert.pem` (certificate)
	- `chain.pem` (intermediate certificates)
	- `fullchain.pem` (Certificate and intermediate certificates concatenated in the correct order)
- Create a new file under `/etc/nginx/ssl` which contains both general ssl configurations and site specific general configurations.
- Create a file called `dhparam.pem` (only if not created before) using the command `sudo openssl dhparam -out dhparam.pem 2048` under the SSL directory.
- Create a site specific file under `/etc/nginx/ssl` with the name `ssl_<domain>.conf` and add
	- `ssl_certificate` (location of `fullchain.pem`)
	- `ssl_certificate_key` (location of `privkey.pem`)
	- `ssl_trusted_certificate` (loaction of `fullchain.pem`)
- Create a new server block for `https` in nginx server block and redirect `http` requests to the new server block.
	```
	server{
		listen 80;
		listen [::]:80;

		server_name <domain name>;
		return 301 https://<domain name>$request_uri;
	}
	```
- To the existing server block which listens on port 80, make the below changes
	```
	{
		listen 443 ssl http2;
		listen [::]:443 ssl http2;

		include /etc/nginx/ssl/ssl_<domain name>.conf;
	}
	```

### ToDO
- Add option for highlighting current date
- Add `Notes` section to the left side.
- Integrate `Notes` with click of each date.
- Add backend to store notes and reminders based on date.
- Retrieve notes and reminders from backend.
- Rollover 6th week to the top
