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
env:
  TF_CLOUD_ORGANIZATION: "MyAwesomeOrg"
  TF_API_TOKEN: "${{ secrets.TF_API_TOKEN }}"
  TF_WORKSPACE: "MyAwesomeWorkspace"
  CONFIG_DIRECTORY: "./terraform"
  TF_HOST: "app.terraform.io"

job: 
 update-tf-vars:
  name: Update tf cloud vars
  runs-on: ubuntu-latest
  steps:
   - uses: patrontech/devops-tf-cloud-update-var@v1.0.1
     with:  
      workSpaceName: ${{env.TF_WORKSPACE}} 
      organizationName: ${{env.TF_CLOUD_ORGANIZATION}}
      terraformToken: ${{env.TF_API_TOKEN}}
      terraformHost: ${{env.TF_HOST}}
      variableName: 'MyAwesomeVar'
      variableValue: ${{ inputs.var }}

```
