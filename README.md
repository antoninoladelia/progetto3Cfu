To import the database you must:
1)Open a browser window and type "localhost"
2)Open PhpMyAdmin
3)Click on import 
4)Chooise "database.sql"
5)Click run.

(User = root , with no password)


Setup enviroment

1)install nodejs

2)open project folder "SuperCoolApp", open a  powershell(shift+dx mouse click), and type npm install


To run the program
1)Run ServiceAPI

2)Run SuperCoolApp




Add to
	In C:\xampp\apache\conf\httpd.conf
	
	Enable 2 modules:
		LoadModule proxy_connect_module modules/mod_proxy_connect.so
		LoadModule proxy_http_module modules/mod_proxy_http.so
		
	In C:\xampp\apache\conf\extra\httpd-vhosts.conf
		Add at the end of the files:
		
			<VirtualHost *:80>
				ProxyPreserveHost On

				# Servers to proxy the connection, or;
				# List of application servers:
				# Usage:
				# ProxyPass / http://[IP Addr.]:[port]/
				# ProxyPassReverse / http://[IP Addr.]:[port]/
				# Example: 
				ProxyPass /api/ http://localhost:5000/api/
				ProxyPassReverse /api http://localhost:5000/api/

				ServerName localhost
			</VirtualHost>
	
	