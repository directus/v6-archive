<p align="center">
<img src="https://s3.amazonaws.com/f.cl.ly/items/3Q2830043H1Y1c1F1K2D/directus-logo-stacked.png" alt="Directus Logo"/>
</p>

# Directus 6 Vagrant box

## This repository only applies to the legacy version of Directus 6.

## Requirements
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://www.vagrantup.com/downloads.html)

## Installation

[Download and install VirtualBox](https://www.virtualbox.org/wiki/Downloads)

[Download and install Vagrant](https://www.vagrantup.com/downloads.html)

Clone our Vagrant configuration:

```
git clone https://github.com/directus/directus-vagrant.git
```

Or download the [zip file](https://github.com/directus/directus-vagrant/archive/master.zip)

```
$ cd directus-vagrant
$ vagrant up
```

## What's on the server?
- Ubuntu 14.04.2 LTS (GNU/Linux 3.13.0-51-generic x86_64)
- Apache 2.4.7
- MySQL 5.5.43
- PHP 5.5.9
- git
- vim
- Composer

## Info
- Server IP: **192.168.33.6**
- Directus credentials:
    - Email: **admin@getdirectus.com**
    - Password: **password**
- Database name: **directus**
- MySQL user: **root**, pass: **123**

The server can be access from:
```
http://192.168.33.6
```
