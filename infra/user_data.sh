#!/bin/bash

# Debian / Ubuntu systems
apt update -y
apt install wget curl unzip -y

# install Terraform v1.1.7
TER_VER=1.1.7
wget https://releases.hashicorp.com/terraform/${TER_VER}/terraform_${TER_VER}_linux_amd64.zip
unzip terraform_${TER_VER}_linux_amd64.zip
mv terraform /usr/local/bin/

# install awscli v2
# https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
rm -rf aws
rm awscliv2.zip

# install jq
apt-get install jq
