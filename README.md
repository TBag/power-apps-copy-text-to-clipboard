# Power Apps Copy To Clipboard Component
This component includes a textbox with a button next to it.  When you click the button it copies the contents of the textbox to the clipboard.  The current value of the text in the textbox is available as a component output property.  This allows the value in the textbox to be used directly from the Power App.

## Video
Watch a video about the component [here]().

## Libraries
This component uses the following library.
https://www.npmjs.com/package/copy-to-clipboard

## How I made this component

1. Install Power Apps CLI 

    https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/powerapps-cli

1. Open a PowerShell prompt.

1. Update CLI tools 

    `pac install latest`

1. Create directory for new component 

    `md CopyTextComponent`

1. Change to new directory 

    `cd CopyTextComponent`

1. Create the component project

    Use this format: `pac pcf init --namespace <specify your namespace here> --name <put component name here> --template <component type>`

    `pac pcf init --namespace CanvizPCF --name PCFCopyTextComponent --template field`

1. Install NPM packages 

    `npm install`

1. Build 

    `npm run build`

1. Start component test environment in web browser and verify it works. 

    `npm start`

1. Stop debugging 

    `CTRL-C`

1. Install copy to clipboard package 

    `npm i --save copy-to-clipboard`

1. Import the package

    Modify index.ts 

    `import * as copy from 'copy-to-clipboard';`

1. Use the copy function to copy to the clipboard.  Typically, this is done in an event handler for a button click.

    Modify index.ts
    
    `copy(this._value.toString());`

1. Save all files.

1. Build 

    `npm run build`

1. Start component test environment in web browser and verify it works. 

    `npm start`

1. Stop debugging 

    `CTRL-C`

1. Create directory for new Solution 

    `md CopyTextSolution`

1. Change to directory 

    `cd CopyTextSolution`

1. Create a Solution to deploy the component 

    `pac solution init --publisher-name ToddBaginski --publisher-prefix TBag`

1. Add the new component to the Solution 

    `pac solution add-reference --path D:\pcf\samples\CopyTextComponent`

    >**Note:** The file path should point to the location where package.json file for your component is located.

1. Restore the Nuget packages 

    `msbuild /t:restore`

1. Compile, bundle, and use the Solution Packager to create the solution (.zip) file.

    `msbuild`

1. Import the Solution in the Power Apps environment.

1. [Enable the Canvas Power Apps Components feature](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps)

1. Add the component to a Power App

    [Canvas](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps#add-components-to-a-canvas-app)

    [Model Driven](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/add-custom-controls-to-a-field-or-entity)

## Author
Todd Baginski @TBag