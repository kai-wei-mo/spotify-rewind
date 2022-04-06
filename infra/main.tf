resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type

  iam_instance_profile   = var.iam_instance_profile
  key_name               = var.key_name
  vpc_security_group_ids = var.vpc_security_group_ids

  user_data = file("user_data.sh")

  tags = var.tags
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.web.id
  allocation_id = aws_eip.eip.id
}

resource "aws_eip" "eip" {
  vpc = true
}

provider "aws" {
  region = var.aws_region
}

terraform {
  required_version = ">= 1.1.7"

  backend "s3" {
    encrypt = true
  }
}
