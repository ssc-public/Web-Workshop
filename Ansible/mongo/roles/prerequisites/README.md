prerequisites
=========

this role is set to configurate the cluster requirment such as:

	. proxy setting for package manager
	. mounting external disk to a certain directory
	. configurating sysctl
	. disabling swapfile if needed
	. configuring the firewall
	. removing the previous deployment footsteps
every one of the above configuration can be ignored if set to false in var/main.yml file

extra data needed for each topic is also provided in var/main.yml file and is configurable

Author Information
------------------

e-mail: letmemakenewone@gmail.com

github: ArshiAAkhavan
