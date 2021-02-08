Cassandra cluster
=========

this is a playbook for deploying a cassandra cluster

Requirements
------------

this playbook works base on ssh protocol so enabled ssh cominucation is required
this playbook by default installs(if neccessery) and configure the firewall so that only nodes can communicate to one another(you can disable it by setting the 'allow_firewall_config' to false)

so if the ssh is set on diffrent port and you dont have any firewall installed on your servers and you wish the play book to configure it for you, please install the firewall yourself and add your ssh port to the firewall

Playbook Variables
--------------

there are two key variable set that needs to be set in this playe book

1) cassandra-hosts.txt wich contains the informations about nodes IP_address, dataCenter, rack, and the seed nodes 

2) roles/config/vars/main.yml witch contains the cluster information such as cluster name and ...

3) roles/prerequisites/vars/main.yml witch contains switches and essential data for things that needs to be done before we start deploying the cluster


Dependencies
------------

no special dependencies is required for this playbook

note that this playbook only deploys the cluster on Debian and RHEL based systems

How To Use
----------------

just simply run the command below on an ansible-system
```
ansible-playbook -i cassandra-hosts.txt cassandra.yml --extra-vars='{"apply_prerequisites":"true", "allow_install":"true" , "allow_config":"true" , "allow_run":"true" , "allow_systemd_downgrade":"true"}'
```
where each variable passad by --extra-vars disables a role if not set to false

p.s: there is some problem with the newest version of systemd and cassandra 3.11 so in order to install cassandra you may need to downgrade your systemd. if you are sure that your systemd current version is compatible with cassandra 3.11 then set "allow_systemd_downgrade" to "false"

Author Information
------------------

e-mail: letmemakenewone@gmail.com

github: ArshiAAkhavan
