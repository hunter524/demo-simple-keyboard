import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';

/**
 * 键盘布局样式
 * @type {{default: string[]}}
 */
const DEFAULT_INPUT_LAYOUT = {
  "default": ['[1 2 3 4 5 6 7 8 9 . 0 {clear}] [{bksp} {close}]']
}
/**
 * 启用的键盘布局名称
 * @type {string}
 */
const DEFAULT_LAYOUT_NAME = "default"

/**
 * 针对 clear bksp close 等功能键进行自定义的显示样式和图案
 * @type {{'{clear}': string, '{close}': string, '{bksp}': string}}
 */
const DEFAULT_DISPLAY = {
  "{clear}": "清空",
  "{bksp}": "⌫",
  "{close}":"收起"
}

/**
 * 阻止复制粘帖避免 input 和 keyboard 内部状态不一致导致奇怪的问题
 * @param event
 * @constructor
 */
const STOP_CUT_PASTE = (event) => {
  event.preventDefault();
};

let PAGE_COUNT = 0;

class App extends Component {
  state = {
    inputName: "input1", /*多个 input 标记当前激活的 input 标签,传递给 keyboard 组件*/
    input: {},/*input name 为 key, value 为输入的值*/
    currentInput:null,
  };

  onChangeAll = inputObj => {
    this.setState({
      input: inputObj
    });

    let input = this.state.currentInput;

    /**
     * 一定要先直接更新 当前 input 的 value 值
     * 后续才能更新坐标
     */
    input.value = inputObj[this.state.inputName];

    /**
     * Synchronizing input caret position
     */
    let caretPosition = this.keyboard.caretPosition;
    if (caretPosition !== null) {
      this.setInputCaretPosition(input, caretPosition);
    }
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    if (button === "{clear}") this.clearScreen();

    if (button === "{close}") this.closeKeyboard();
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
    // 监听返回按键
    if (PAGE_COUNT<=0){
      window.history.forward()
    }
    this.setState(
        {
          inputName: inputName,
          keyboardOpen: true,
          currentInput:evt.target
        },
        () => {
          console.log("Active input", inputName);
          if (evt.target.scrollIntoViewIfNeeded){
            evt.target.scrollIntoViewIfNeeded()
          }
          else {
            evt.target.scrollIntoView()
          }
        }
    );
  };

  closeKeyboard = () => {
    if (PAGE_COUNT >= 1){
      window.history.back()
    }
    if (this.state.currentInput){
      this.state.currentInput.blur()
    }
    this.setState({
      keyboardOpen: false
    });
  };

  setInputCaretPosition(input, pos) {
    console.log("setInputCaretPosition",input)
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(pos, pos);
    }
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

  componentDidMount() {
    window.history.pushState(null,null,document.URL)
    PAGE_COUNT++
    window.addEventListener("popstate",()=>{
      PAGE_COUNT--
      this.closeKeyboard()
    })
  }

  render() {
    let { input, keyboardOpen } = this.state;

    return (
        <div id='vRoot'>
          <div className="inputsContainer">
            <div> 99.5% BROWSER</div>
            {
              [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(
                  value => {
                    return (<input
                        id={`input${value}`}
                        onPaste={STOP_CUT_PASTE}
                        onCut={STOP_CUT_PASTE}
                        onFocus={(evt) => this.setActiveInput(`input${value}`,evt)}
                        value={input[`input${value}`] || ""}
                        placeholder={`input${value}`}
                        onChange={e => this.onChangeInput(e)}
                        onBlur={this.closeKeyboard}
                        inputMode={'none'}
                    />)
                  }
              )
            }
            <div> iOS Before 12.2 osVersion Android Chrome Before 66 Version</div>
            {
              [17,18,19,20,21,22,23,24,25,26,27,28].map(
                  value => {
                    return (<input
                        id={`input${value}`}
                        className={"legacy_outline"}
                        onPaste={STOP_CUT_PASTE}
                        onCut={STOP_CUT_PASTE}
                        onFocus={(evt) => this.setActiveInput(`input${value}`,evt)}
                        value={input[`input${value}`] || ""}
                        placeholder={`input${value}`}
                        onChange={evt => this.onChangeInput(evt)}
                        onBlur={this.closeKeyboard}
                        readOnly={true}
                    />)
                  }
              )
            }

          </div>
          <div className={`keyboardContainer ${!keyboardOpen ? "hidden" : ""}`}>
            <Keyboard
                keyboardRef={r => (this.keyboard = r)}
                inputName={this.state.inputName}
                layoutName={DEFAULT_LAYOUT_NAME}
                layout={DEFAULT_INPUT_LAYOUT}
                display={DEFAULT_DISPLAY}
                preventMouseDownDefault={true}
                autoUseTouchEvents={true}
                inputPattern={/(^\d+$)|(^\d+\.$)|(^\d+\.\d{0,2}$)/}
                onChangeAll={inputObj => this.onChangeAll(inputObj)}
                onKeyPress={button => this.onKeyPress(button)}

            />
          </div>
        </div>
    );
  }
}

export default App
