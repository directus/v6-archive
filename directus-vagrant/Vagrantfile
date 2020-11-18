Vagrant.configure("2") do |config|

    config.vm.box = "getdirectus/directus"
    config.vm.box_version = "0.2.1"
    config.vm.network "private_network", ip: "192.168.33.6"
    config.vm.hostname = "directusdemo"

    # Configure VirtualBox environment
    config.vm.provider :virtualbox do |v|
        # Set memory to 1GB
        v.customize [ "modifyvm", :id, "--memory", 1024 ]
    end
 
    config.vm.provision :shell, path: "bootstrap.sh"
 
    config.vm.synced_folder "html/", "/var/www/html", :mount_options => ["dmode=777", "fmode=666"]

end
