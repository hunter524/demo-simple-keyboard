import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';

class App extends Component {
  state = {
    layoutName: "ip",
    inputName: "input1",
    input: {},
    currentInput:null,
  };

  onChangeAll = inputObj => {
    this.setState({
      input: inputObj
    });

    console.log("Input changed", inputObj);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    if (button === "{clear}") this.clearScreen();

    if (button === "{close}") this.closeKeyboard();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let inputVal = event.target.value;

    let updatedInputObj = {
      ...this.state.input,
      [this.state.inputName]: inputVal
    };

    this.setState(
        {
          input: updatedInputObj
        },
        () => {
          this.keyboard.setInput(inputVal);
        }
    );
  };

  setActiveInput = (inputName,evt )=> {

    this.setState(
        {
          inputName: inputName,
          keyboardOpen: true,
          currentInput:evt.target
        },
        () => {
          console.log("Active input", inputName);
          if (evt.target.scrollIntoViewIfNeeded){
            console.log("call scrollIntoViewIfNeeded")
            evt.target.scrollIntoViewIfNeeded()
          }
          else {
            evt.target.scrollIntoView()
          }
        }
    );
  };

  closeKeyboard = () => {
    if (this.state.currentInput){
      this.state.currentInput.blur()
    }
    this.setState({
      keyboardOpen: false
    });
  };

  submit = () => {
    console.log(this.state.input);
  };

  componentDidMount() {

  }

  clearScreen = () => {
    let input = { ...this.state.input };
    let inputName = this.state.inputName;
    input[inputName] = "";

    this.setState({ input }, () => {
      this.keyboard.clearInput(inputName);
      console.log(
          "cleared",
          input,
          this.keyboard.options.inputName,
          this.keyboard.input,
          this.keyboard.getInput()
      );
    });
  };

  render() {
    let { input, keyboardOpen } = this.state;

    return (
        <div id='vRoot'>
          <div className="inputsContainer">
            <div>AAAA<br/>AAAAA</div>
            <input
                onFocus={(evt) => this.setActiveInput("input1",evt)}
                value={input["input1"] || ""}
                placeholder={"Input 1"}
                onChange={e => this.onChangeInput(e)}
                onBlur={this.closeKeyboard}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input2",evt)}
                value={input["input2"] || ""}
                placeholder={"Input 2"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input3",evt)}
                value={input["input3"] || ""}
                placeholder={"Input 3"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input4",evt)}
                value={input["input4"] || ""}
                placeholder={"Input 4"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input5",evt)}
                value={input["input5"] || ""}
                placeholder={"Input 5"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input6",evt)}
                value={input["input6"] || ""}
                placeholder={"Input 6"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input7",evt)}
                value={input["input7"] || ""}
                placeholder={"Input 7"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input8",evt)}
                value={input["input8"] || ""}
                placeholder={"Input 8"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input9",evt)}
                value={input["input9"] || ""}
                placeholder={"Input 9"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input10",evt)}
                value={input["input10"] || ""}
                placeholder={"Input 10"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input11",evt)}
                value={input["input11"] || ""}
                placeholder={"Input 11"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input12",evt)}
                value={input["input12"] || ""}
                placeholder={"Input 12"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input13",evt)}
                value={input["input13"] || ""}
                placeholder={"Input 13"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input14",evt)}
                value={input["input14"] || ""}
                placeholder={"Input 14"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input15",evt)}
                value={input["input15"] || ""}
                placeholder={"Input 15"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input16",evt)}
                value={input["input16"] || ""}
                placeholder={"Input 16"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input17",evt)}
                value={input["input17"] || ""}
                placeholder={"Input 17"}
                onChange={e => this.onChangeInput(e)}
            />
            <input
                onFocus={(evt) => this.setActiveInput("input18",evt)}
                value={input["input18"] || ""}
                placeholder={"Input 18"}
                onChange={e => this.onChangeInput(e)}
            />
          </div>
          <div className={`keyboardContainer ${!keyboardOpen ? "hidden" : ""}`}>
            <Keyboard
                keyboardRef={r => (this.keyboard = r)}
                inputName={this.state.inputName}
                layoutName={this.state.layoutName}
                preventMouseDownDefault={true}
                autoUseTouchEvents={true}
                onChangeAll={inputObj => this.onChangeAll(inputObj)}
                onKeyPress={button => this.onKeyPress(button)}
                layout={{
                  "ip": ['[1 2 3 4 5 6 7 8 9 . 0 {clear}] [{bksp} {close}]']
                }}
                display={{
                  "{clear}": "清空",
                  "{bksp}": "⌫",
                  "{close}":"收起"
                }}
            />
          </div>
        </div>
    );
  }
}

export default App
