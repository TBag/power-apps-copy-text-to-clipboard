import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as copy from 'copy-to-clipboard';

export class PCFCopyTextComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// Value of the field is stored and used inside the control 
	private _value: string;

	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
	private _notifyOutputChanged: () => void;

	// input/textarea element created as part of this control
	private textInput: any;

	// button element created as part of this control
	private button: HTMLButtonElement;

	// Reference to the control container HTMLDivElement
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;

	private _rootContainer: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		// get root container before child controls are appended
		this._rootContainer = this.getRootContainer(container)!;
		
		// Adding the textInput and button created to the container DIV.
		this._container = document.createElement("div");

		// Creating the textInput for the control and setting the relevant values.
		if (context.parameters.MultiLine.raw) {
			this.textInput = document.createElement("textarea");
		}
		else {
			this.textInput = document.createElement("input");
			this.textInput.setAttribute("type", "text");

			this._container.classList.add('single');
		}
		this.textInput.addEventListener("blur", this.onInputBlur.bind(this));
		this.textInput.addEventListener("change", this.onInputBlur.bind(this));
		//this.configureInputProperties(this.textInput, context.parameters);
		this._container.appendChild(this.textInput);

		this._notifyOutputChanged = notifyOutputChanged;
		this.button = document.createElement("button");
		// Get the localized string from localized string 
		this.button.innerHTML = context.resources.getString("PCFCopyTextComponent_ButtonLabel");
		this.button.addEventListener("click", this.onButtonClick.bind(this));
		//this.configureButtonProperties(this.button, context.parameters);
		this._container.appendChild(this.button);

		container.appendChild(this._container);

		//Deliberately Set ShowTextInput Property to true
		context.parameters.ShowTextInput.raw = true;

		//console.log("Init function just executed")

	}

	private configureInputProperties(input: any, parameters: IInputs) {
		input.placeholder = parameters.Placeholder.raw!;
		input.maxLength = parameters.MaxLength.raw || (input.tagName === 'input' ? 255 : 500);
		input.readOnly = parameters.ReadOnly.raw;

		input.classList.add("CopyText_Input_Style");

		
		//console.log(`Property Hide Text input - ${parameters.ShowTextInput.raw}`);

		if(parameters.ShowTextInput.raw) {
			this.textInput.classList.add("CopyText_Input_Show");
			this.textInput.classList.remove("CopyText_Input_Hide");
		} else {
			this.textInput.classList.add("CopyText_Input_Hide");
			this.textInput.classList.remove("CopyText_Input_Show");
		}
		
		//console.dir(this.textInput.classList);

		input.style.color = parameters.InputColor.raw!;
		input.style.fontSize = parameters.InputFontSize.raw + 'pt';
		input.style.fontWeight = parameters.InputFontWeight.raw!;
		input.style.fontFamily = parameters.InputFontFamily.raw!;
		input.style.borderWidth = parameters.InputBorderThickness.raw + 'px';
		input.style.borderRadius = parameters.InputBorderRadius.raw + 'px';
		input.style.borderColor = parameters.InputBorderColor.raw!;
		input.style.backgroundColor = parameters.InputBackgroundColor.raw!;
	}

	private configureButtonProperties(button: HTMLButtonElement, parameters: IInputs) {
		button.classList.add("CopyText_Button_Style");
		
		button.style.color = parameters.ButtonColor.raw!;
		button.style.fontSize = parameters.ButtonFontSize.raw + 'pt';
		button.style.fontWeight = parameters.ButtonFontWeight.raw!;
		button.style.fontFamily = parameters.ButtonFontFamily.raw!;
		button.style.borderWidth = parameters.ButtonBorderThickness.raw + 'px';
		button.style.borderRadius = parameters.ButtonBorderRadius.raw + 'px';
		button.style.borderColor = parameters.ButtonBorderColor.raw!;
		button.style.backgroundColor = parameters.ButtonBackgroundColor.raw!;
	}

	/**
		 * Button Event handler for the button created as part of this control
		 * @param event
		 */
	private onButtonClick(event: Event): void {
		this._notifyOutputChanged();
		copy(this._value.toString());
	} 

	/**
	 * Input Blur Event handler for the input created as part of this control
	 * @param event
	 */
	private onInputBlur(event: Event): void {
		this._value = this.textInput.value;
		this._notifyOutputChanged();
	}

	/** 
	 * Get root container which has height set before the child nodes are appended
	*/
	private getRootContainer(container: HTMLDivElement) {
		let node : HTMLDivElement | null = container;
		
		// lookup the first parent node which has a height set
		while (node && !node.style.height) {
			node = node.parentNode as HTMLDivElement | null;
		}

		return node;
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view
		
		this._value = context.parameters.Value.raw!;
		let tempValue = this._value != null ? this._value.toString() : "";

		this.textInput.value = tempValue;

		if (context.parameters.Value.error) {
			this.textInput.classList.add("CopyText_Input_Error_Style");
		}
		else {
			this.textInput.classList.remove("CopyText_Input_Error_Style");
		}

		// refresh input size
		this.textInput.style.height = this._rootContainer.style.height;

		// might get the width/height as below in the future
		//context.accessibility._customControlProperties.parentDefinedControlProps.width
		//context.accessibility._customControlProperties.parentDefinedControlProps.height

		this.configureInputProperties(this.textInput, context.parameters);
		this.configureButtonProperties(this.button, context.parameters);
		//console.log("UpdateView function just executed!")
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
	 */
	public getOutputs(): IOutputs {
		// custom code goes here - remove the line below and return the correct output
		let result: IOutputs = {
			Value: this._value
		};
		//console.log("getOutputs function just executed")
		return result;
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}