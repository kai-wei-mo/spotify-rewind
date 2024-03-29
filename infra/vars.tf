variable "aws_region" { type = string }
variable "ami" { type = string }
variable "instance_type" { type = string }

variable "iam_instance_profile" { type = string }
variable "key_name" { type = string }
variable "vpc_security_group_ids" { type = list(string) }

variable "tags" {}
