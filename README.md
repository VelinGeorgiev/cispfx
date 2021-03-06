# Azure DevOps with SharePoint Framework 

The current sample includes node.js api and SPFx package to be deployed using Azure pipelines.
You can get started with this video. 

[![Community Demo - Setting up Azure DevOps Pipelines for SharePoint Framework solutions](https://img.youtube.com/vi/V6xEy6_2iTg/0.jpg)](https://www.youtube.com/watch?v=V6xEy6_2iTg "Community Demo - Setting up Azure DevOps Pipelines for SharePoint Framework solutions")

# "Why should you automate your SharePoint Framework project?", the PowerPoint presentation I used for the session

One Drive - [https://1drv.ms/p/s!Akhm5E9YUqeWgrBhBEXhsQrGvVXWQg](https://1drv.ms/p/s!Akhm5E9YUqeWgrBhBEXhsQrGvVXWQg​)

# PnP Samples Step by step guide

A PnP Sample step by steb guide can be found here:
[https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-jest-testing/devops](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-jest-testing/devops​)

### Other usefull links

- [https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-nodejs-webapi](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-nodejs-webapi)

- [https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs](https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs​)

- [https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-rm-web-app-deployment?view=vsts](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-rm-web-app-deployment?view=vsts​)


### This is for my own reference when doing the demo


```sh
# Node.js
# Build a general Node.js project with npm.
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/javascript

trigger:
- master

pool:
  vmImage: 'Ubuntu-16.04'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '8.x'
  displayName: 'Install Node.js'

- script: |
    cd spfx
    npm install
    gulp bundle --ship
    gulp package-solution --ship
  displayName: 'npm install and build'

- script: |
    cd spfx
    npm test
  displayName: 'npm test (jest)'

# Publish Build Artifacts SPFx sppkg
- task: PublishBuildArtifacts@1
  inputs:
    pathtoPublish: '$(Build.SourcesDirectory)/spfx/sharepoint/solution/node-frontend.sppkg' 
    artifactName: 'SPFx sppkg' 
  displayName: 'Publish build SPFx artifacts'

# Publish Build Artifacts Office 365 CLI
- task: PublishBuildArtifacts@1
  inputs:
    pathtoPublish: '$(Build.SourcesDirectory)/devops/release/' 
    artifactName: 'Office 365 CLI scripts' 
  displayName: 'Publish build Office 365 CLI artifacts'
```

Azure App Service Deploy