const core = require('@actions/core');
const axios = require('axios');

async function main() {

    try{

        const workSpaceName = core.getInput('workSpaceName');
        const organizationName = core.getInput('organizationName');
        const token = core.getInput('terraformToken');
        const terraformHost = core.getInput('terraformHost');
        const variableValue = core.getInput('variableValue');
        const variableName = core.getInput('variableName');
        let variableHCL = core.getInput('variableHCL');

        if (variableHCL !== 'true'){
            variableHCL = 'false';
        }

        const options = {
            headers: {'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Bearer '+token
            }
        };

        // Fetching WorkSpaceId
        // TODO: Throw exception if workspace don't exist.
        const terraformWorkSpaceEndpoint = "https://"+terraformHost+"/api/v2/organizations/"+organizationName+"/workspaces/"+workSpaceName;
        const response = await axios.get(terraformWorkSpaceEndpoint,options);
        const workSpaceId = response.data.data.id;
        console.log("workSpaceId:"+workSpaceId)

        // Fetch Terraform Variable ID
        const terraformListVariablesEndpoint = "https://"+terraformHost+"/api/v2/vars/?filter[organization][name]="+organizationName+"&filter[workspace][name]="+workSpaceName;
        const response2 = await axios.get(terraformListVariablesEndpoint,options);
        const workspaceVariables = response2.data.data;
        let variableId = null;
        for (let variable of workspaceVariables) {
            if(variable.attributes.key === variableName){
                variableId = variable.id
            }
        }
        // Check to make sure we found said variable
        if (variableId == null) {
            core.setFailed('Variable Could Not Be Found');
        }
        console.log("variableID:"+variableId)

        // Update variable value we've found from missing step.
        const terraformVariableUpdateEndpoint = "https://"+terraformHost+"/api/v2/vars/"+variableId;
        let request = { data : {
                id: variableId,
                attributes: {
                    "value" : variableValue,
                    "hcl" : variableHCL
                },
                type: "vars",
            }};
        console.log("run request:" + JSON.stringify(request));

        // Invoking Terraform Variable Patch API
        axios.patch(terraformVariableUpdateEndpoint, request, options)
            .then((response) => {
                console.log("Update Variable Success:"+ JSON.stringify(response.data));
                core.setOutput("variableId", response.data.data.id);
            }, (error) => {
                console.error("Update Variable Error:"+JSON.stringify(error.response.data));
                core.setFailed(error.message);
            });

    } catch(error){
        core.setFailed(error.message);
    }
}

main();