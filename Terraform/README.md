![Terraform-image](https://camo.githubusercontent.com/6d6ec94bb2909d75122df9cf17e1940b522a805587c890a2e37a57eba61f7eb1/68747470733a2f2f7777772e6461746f636d732d6173736574732e636f6d2f323838352f313632393934313234322d6c6f676f2d7465727261666f726d2d6d61696e2e737667)

## Introduction to Infrastructure as Code (IaC) and Terraform
  
Infrastructure as Code (IaC) tools allow you to manage infrastructure with configuration files rather than through a graphical user interface. IaC allows you to build, change, and manage your infrastructure in a safe, consistent, and repeatable way by defining resource configurations that you can version, reuse, and share.

Terraform is HashiCorp's infrastructure as code tool. It lets you define resources and infrastructure in human-readable, declarative configuration files, and manages your infrastructure's lifecycle.

## Install Terraform
To use Terraform you will need to install it. You can install Terraform using popular package managers. Depending on your OS you can install Terraform according to [this page](https://developer.hashicorp.com/terraform/tutorials/docker-get-started/install-cli).

## Nginx and Docker Example
Create a directory and cd into it. Then create a file called `main.tf` and paste the following Terraform configuration into it:

```hcl
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.image_id
  name  = "tutorial"

  ports {
    internal = 80
    external = 8000
  }
}
```

Then initialize the project, which downloads a plugin called a provider that lets Terraform interact with Docker:
```shell
terraform init
```

Then provision the Nginx server container with apply:
```shell
terraform apply
```

Now verify the existence of the Nginx container by visiting http://localhost:8000 in your web browser.

To stop the container, run:
```shell
terraform destroy
```

### Review the Nginx configuration

The set of files used to describe infrastructure in Terraform is known as a Terraform configuration. Each Terraform configuration must be in its own working directory. You will learn about each block of the `main.tf` file that you created previously in more detail.

#### Terraform Block

The `terraform {}` block contains Terraform settings, including the required providers Terraform will use to provision your infrastructure. For each provider, the `source` attribute defines an optional hostname, a namespace, and the provider type. Terraform installs providers from the Terraform Registry by default. In this example configuration, the docker provider's source is defined as `kreuzwerker/docker`, which is shorthand for `registry.terraform.io/kreuzwerker/docker`.

You can also set a version constraint for each provider defined in the `required_providers` block. The `version` attribute is optional, but we recommend using it to constrain the provider version so that Terraform does not install a version of the provider that does not work with your configuration. If you do not specify a provider version, Terraform will automatically download the most recent version during initialization.


#### Providers

The `provider` block configures the specified provider, in this case `docker`. A provider is a plugin that Terraform uses to create and manage your resources.

You can use multiple provider blocks in your Terraform configuration to manage resources from different providers. You can even use different providers together. For example, you could pass the Docker image ID to a Kubernetes service.

#### Resources
Use `resource` blocks to define components of your infrastructure. A resource might be a physical or virtual component such as a Docker container, or it can be a logical resource such as a Heroku application.

Resource blocks have two strings before the block: the resource type and the resource name. In this example, the first resource type is `docker_image` and the name is `nginx`. The prefix of the type maps to the name of the provider. In the example configuration, Terraform manages the `docker_image` resource with the `docker` provider. Together, the resource type and resource name form a unique ID for the resource. For example, the ID for your Docker image is `docker_image.nginx`.


## Conclustion
One of the key strengths of Terraform is its ability to work seamlessly across multiple cloud providers like AWS, Azure, Google coloud, etc... . Terraform provides a consistent and unified approach to provisioning and managing infrastructure, making it an ideal choice for organizations that use a multi-cloud or hybrid cloud strategy.
