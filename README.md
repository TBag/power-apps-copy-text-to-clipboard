# Power Apps Copy To Clipboard Component
This component includes a textbox with a button next to it.  When you click the button it copies the contents of the textbox to the clipboard.  The current value of the text in the textbox is available as a component output property.  This allows the value in the textbox to be used directly from the Power App.

![Demonstration](/images/Demo.gif)

## Video
Watch a deep dive video about the component [here](https://youtu.be/URQLR8ndsOE).

## Libraries
This component uses the following library.
https://www.npmjs.com/package/copy-to-clipboard

## Prebuilt Solution
Download this solution and import it into your Power Apps environment's Solution Gallery.  Then, you can add the component to your Power Apps.  See the video to learn how and look at the steps below.

[CopyTextSolution.zip](https://github.com/TBag/power-apps-copy-text-to-clipboard/blob/master/CopyTextComponent/CopyTextSolution/bin/Debug/CopyTextSolution.zip)

## Test Power App
Download this Power App and import it into your Power Apps environment.  This is the same Power App I use to demonstrate the component in the video.

[Copy Text To Clipboard.msapp](https://github.com/TBag/power-apps-copy-text-to-clipboard/blob/master/CopyTextComponent/TestPowerApp/Copy%20Text%20To%20Clipboard.msapp)

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

    `pac pcf init --namespace CanvizLLCPCF --name PCFCopyTextComponent --template field`

1. Install NPM packages 

    `npm install`

1. Build 

    `npm run build`

1. Start component test environment in web browser and verify it works. 

    `npm start`

1. Stop debugging 

    `CTRL+C`

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

    `CTRL+C`

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

## Upgrade

Follow the steps below to upgrade the PCF component in normal process.

1. Keep the old version in the PowerApps and in your environment and close the PowerApps designer.
1. Increase the version numbers in both the files [ControlManifest.Input.xml](https://github.com/TBag/power-apps-copy-text-to-clipboard/blob/master/CopyTextComponent/PCFCopyTextComponent/ControlManifest.Input.xml) and [Solution.xml](https://github.com/TBag/power-apps-copy-text-to-clipboard/blob/master/CopyTextComponent/CopyTextSolution/Other/Solution.xml).
1. Package the new version and import to Power platform to overwrite previous version.
1. Reopen the PowerApps designer, and click **Update** button in the **Update code components** dialog.

If the upgrade isn't smoothly or the **Update code components** dialog never show, you could consider the following workaround.
1. Remove all component references from the PowerApps.
1. Uninstall the solution from your environment.
1. Export the PowerApps and re-import to overwrite the current version.
1. Reopen the PowerApps, then save and publish.
1. Change the **namespace** and **constructor** in the file [ControlManifest.Input.xml](https://github.com/TBag/power-apps-copy-text-to-clipboard/blob/master/CopyTextComponent/PCFCopyTextComponent/ControlManifest.Input.xml) to a different one, so that the PowerApps could locate the new resources in different path.
1. Increase the version numbers in both the files [ControlManifest.Input.xml](https://github.com/TBag/power-apps-copy-text-to-clipboard/blob/master/CopyTextComponent/PCFCopyTextComponent/ControlManifest.Input.xml) and [Solution.xml](https://github.com/TBag/power-apps-copy-text-to-clipboard/blob/master/CopyTextComponent/CopyTextSolution/Other/Solution.xml).
1. Package and import it again.
1. Add the component to your PowerApps.

> **Notice:** It's recommended to finalize the component info (name, namespace, constructor), and solution type (unmanaged, managed) before adding the PCF component to your PowerApps for the first time, otherwise, it might cause risks in your future upgrades.


## Author
Todd Baginski @TBag
