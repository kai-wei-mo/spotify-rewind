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
