# infra
The infrastructure required for the project.

## Manual Components
Manually create the AWS resources in `manual_components` as a security best practice.

## Terraform Operations
```Bash
terraform init -backend-config=backend.config
terraform plan -var-file=variables.tfvars
terraform apply -var-file=variables.tfvars
terraform destroy -var-file=variables.tfvars
```

## Cloudfront Distribution + ACM Certificate
- register the domain name with Google Domains
- attach SSL certificate to the domain, which requires an intermediary use of Cloudfront
  - https://aws.amazon.com/premiumsupport/knowledge-center/configure-acm-certificates-ec2/
