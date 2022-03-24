terraform init -backend-config=backend.config
terraform plan -var-file=variables.tfvars
terraform apply -var-file=variables.tfvars
terraform destroy -var-file=variables.tfvars
