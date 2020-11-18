# Vagrant Box Install

### Requirements
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://www.vagrantup.com/downloads.html)

----------

### Installation

[Download and install VirtualBox](https://www.virtualbox.org/wiki/Downloads)

[Download and install Vagrant](https://www.vagrantup.com/downloads.html)

Clone our Vagrant configuration:

```
git clone https://github.com/RNGR/directus-vagrant.git
```

Or download the [zip file](https://github.com/RNGR/directus-vagrant/archive/master.zip)

```
$ cd [vagrant dir]
$ vagrant up
```

----------

### What's on the server?
- Ubuntu 14.04.2 LTS (GNU/Linux 3.13.0-51-generic x86_64)
- Apache 2.4.7
- MySQL 5.5.43
- PHP 5.5.9
- git
- vim
- Composer

----------

### Info
- Server IP: **192.168.33.6**
- Directus user: **admin@getdirectus.com** pass: **password**
- Database name: **directus**
- MySQL user: **root**, pass: **123**

The server now can be access from:
```
http://192.168.33.6
```
