# Update Terraform Cloud Variable

This action updates a Terraform Cloud variable
https://www.terraform.io/docs/cloud/api/variables.html

It borrows heavily from the work done by https://github.com/sarathkrish/invoke-terraform-run-api so shout out to them.

## Inputs

### `workSpaceName`

**Required** The name of the workspace.

### `organizationName`

**Required** Your Organization.

### `terraformToken`

**Required** Your Terraform token. Please use secret to store your Terraform token.

 ### `terraformHost`

**Required** This is the Terraform Host Name. For Terraform cloud its app.terraform.io.

### `variableName`

**Required** The variable name to be updated.

 ### `variableValue`

**Required** The value to update the variable with.

## Outputs

### `variableId`

 The variable ID.

## Example usage

```
uses: patrontech/devops-tf-cloud-update@v1.0   
with:  
  workSpaceName: MyTestWorkspace  
  organizationName: {{env.organization}}  
  terraformToken: {{secrets.Terraform_Token}}
  terraformHost: 'app.terraform.io'
  variableName: 'container_tag'
  variableValue: 'v1.1.1'
```