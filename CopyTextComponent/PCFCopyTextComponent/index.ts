import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as copy from 'copy-to-clipboard';

export class PCFCopyTextComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// Value of the field is stored and used inside the control 
	private _value: string;

	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
	private _notifyOutputChanged: () => void;

	// input element created as part of this control
	private textInput: HTMLInputElement;

	private textArea: HTMLTextAreaElement;

	private textLabel: HTMLLabelElement;

	// button element created as part of this control
	private button: HTMLButtonElement;

	// Reference to the control container HTMLDivElement
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;

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
		// Add control initialization code
		//copy('This is awesome text copied on ' + Date.now.toString());

		// get root container before child controls are appended
		let rootContainer = this.getRootContainer(container);

		// Creating the textInput for the control and setting the relevant values.
		switch (context.parameters.Mode.raw) {
			case "SingleLine":
				this.textInput = document.createElement("input");
				this.textInput.setAttribute("type", "text");
				this.textInput.maxLength = context.parameters.MaxLength.raw || 255;
				this.textInput.addEventListener("blur", this.onInputBlur.bind(this));
				this.textInput.addEventListener("change", this.onInputBlur.bind(this));
				this.textInput.classList.add("CopyText_Input_Style");
				this.textInput.readOnly = context.parameters.ReadOnly.raw;
				break;
			case "MultiLine":
				this.textArea = document.createElement("textarea");
				this.textArea.maxLength = context.parameters.MaxLength.raw || 500;
				this.textArea.addEventListener("blur", this.onInputBlur.bind(this));
				this.textArea.addEventListener("change", this.onInputBlur.bind(this));
				this.textArea.classList.add("CopyText_Input_Style");
				this.textArea.readOnly = context.parameters.ReadOnly.raw;
				break;
		}

		this.button = document.createElement("button");

		// Get the localized string from localized string 
		this.button.innerHTML = context.resources.getString("PCFCopyTextComponent_ButtonLabel");

		this.button.classList.add("CopyText_Button_Style");
		this._notifyOutputChanged = notifyOutputChanged;
		this.button.addEventListener("click", this.onButtonClick.bind(this));

		// Adding the textInput and button created to the container DIV.
		this._container = document.createElement("div");
		if (this.textArea) {
			this._container.appendChild(this.textArea);
		}
		else {
			this._container.appendChild(this.textInput);
		}
		this._container.appendChild(this.button);
		container.appendChild(this._container);

		// auto-adjust size for textInput
		if (rootContainer) {
			let width = rootContainer.clientWidth - this.button.offsetWidth;
			let height = rootContainer.clientHeight;

			if (this.textArea) {
				this.textArea.style.width = width + "px";
				this.textArea.style.height = height + "px";
			}
			else {
				this.textInput.style.width = width + "px";
				this.textInput.style.height = height + "px";
			}
		}
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
		if (this.textArea) {
			this._value = this.textArea.value;
		}
		else {
			this._value = this.textInput.value;
		}
		this._notifyOutputChanged();
	}

	/**
	 * Get root container which has height set before the child nodes are appended
	*/
	private getRootContainer(container: HTMLDivElement) {
		let node : HTMLDivElement | null = container;
		
		// lookup the first parent node which has a height set
		while (node && !node.clientHeight) {
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

		let classList: DOMTokenList;
		if (this.textArea) {
			this.textArea.value = tempValue;
			classList = this.textArea.classList;
		}
		else {
			this.textInput.value = tempValue;
			classList = this.textInput.classList;
		}

		if (context.parameters.Value.error) {
			classList.add("CopyText_Input_Error_Style");
		}
		else {
			classList.remove("CopyText_Input_Error_Style");
		}
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