# NGINX Configuration
At this point it is assumed that you already have installed and configured nginx and have a basic understanding of nginx. 

[Directus NGINX Configuration](https://github.com/directus/directus-vagrant/tree/master/config/nginx)

> **Important:** This is an incomplete guide, but it should help you get Directus installed and set up on nginx. It was tested on: Ubuntu 14.04.1 - nginx/1.4.6 (Ubuntu)

### Site configuration

Since nginx doesn't use `.htaccess`, which does the url rewriting, we therefore need to do the rewrite within nginx itself. Below we configure an nginx server block.

Open the default server block file:
```
sudo vim /etc/nginx/sites-available/default
```

The nginx server block should look like this:

```
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /path/to/directus;
    index index.php index.html index.htm;

    server_name localhost;

    location / {
        try_files $uri $uri/ =404;
    }
    
    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

**IMPORTANT**: Some NGINX packages are distributed without `SCRIPT_FILENAME` param inside their `fastcgi_params`
to avoid problems please add `fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;` before `include fastcgi_params;`.

Change `location /` to this:
```
location / {
    try_files $uri $uri/ /index.php$args;
}
```

Add a new location:
```
location /api {
	if (!-e $request_filename) {
		rewrite ^/1/extensions/([^/]+) /api/api.php?run_extension=$1 last;
	}
	rewrite ^ /api/api.php?run_api_router=1 last;
}
```

Add another location to prevent uploaded php/html files to execute.
```
location ~ ^/(media|storage)/.*\.(php|phps|php5|htm|shtml|xhtml|cgi.+)?$ {
    add_header Content-Type text/plain;
}
```

### Extensions
To prevent direct access to extensions `api.php` file we need to edit `/etc/nginx/sites-available/default` and add a new location:

```
location ~* ^/customs/extensions/api\.php$ {
    return 403;
}
```

### Custom endpoints
Prevent direct access to api endpoint files.

```
location ~* /customs/endpoints/ {
	deny all;
}
```

### Fonts Mime types

To serve fonts mime types correctly we need to edit `/etc/nginx/mime.types` and add these lines in it:
```
application/vnd.ms-fontobject    eot;
font/truetype                    ttf;
font/opentype                    otf;
font/woff                        woff;
```


### PHP Values

The result of these two files (`/etc/nginx/mime.types`, `/etc/nginx/sites-available/default`) and  can be found in here [config/nginx](https://github.com/directus/directus-vagrant/tree/master/config/nginx)

**[TODO]**