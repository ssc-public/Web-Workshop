firewall
=========

this role sets up the firewall for each node

Requirements
------------

note that if 'allow_firewall_config' is set to true this role will set up a firewall so that only the cluster nodes can see each other and will block ssh if it is using any other port

so if you are using ssh on other ports pleas install the firewall your self and add the ssh port to it manually

Role Variables
--------------

anisble_ssh_port

Dependencies
------------

none

Author Information
------------------

e-mail: letmemakenewone@gmail.com

github: ArshiAAkhavan


