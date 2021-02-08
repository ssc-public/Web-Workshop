Mongo ReplicaSet
=========

this is a playbook for deploying a Mongo ReplicaSet

Requirements
------------

this playbook works base on ssh protocol so enabled ssh cominucation is required
this playbook by default installs(if neccessery) and configure the firewall so that only nodes can communicate to one another(you can disable it by setting the 'allow_firewall_config' to false)

so if the ssh is set on diffrent port and you dont have any firewall installed on your servers and you wish the play book to configure it for you, please install the firewall yourself and add your ssh port to the firewall

Playbook Variables
--------------

there are two key variable set that needs to be set in this playe book

1) mongo-hosts.txt wich contains the informations about nodes IP_address and theyr priority

2) roles/config/vars/main.yml witch contains the replicaSet information such as replname and ...

3) roles/prerequisites/vars/main.yml witch contains switches and essential data for things that needs to be done before we start deploying the cluster

Dependencies
------------

no special dependencies is required for this playbook

note that this playbook only deploys the cluster on Debian and RHEL based systems

How To Use
----------------

just simply run the command below on an ansible-system
```
ansible-playbook -i mongo-hosts.txt mongo.yml --extra-vars='{"apply_prerequisites":"true" ,  "allow_install":"true" , "allow_config":"true" , "allow_run":"true"}'
```
where each variable passad by --extra-vars disables a role if not set to false

Author Information
------------------

e-mail: letmemakenewone@gmail.com

github: ArshiAAkhavan
