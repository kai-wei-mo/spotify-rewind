provider "aws" {
  region = var.aws_region
}

teraform {
  backend "s3" {
    encrypt = true
  }
}
