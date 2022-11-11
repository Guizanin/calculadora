import { Component } from "react";
import { Button } from "../Button";
import { Display } from "../Display";
import "./Calculator.css";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

const DIGIT = "Digit";

const CALCULATOR_BUTTONS = {
  [DIGIT + "0"]: DIGIT + "0",
  [DIGIT + "1"]: DIGIT + "1",
  [DIGIT + "2"]: DIGIT + "2",
  [DIGIT + "3"]: DIGIT + "3",
  [DIGIT + "4"]: DIGIT + "4",
  [DIGIT + "5"]: DIGIT + "5",
  [DIGIT + "6"]: DIGIT + "6",
  [DIGIT + "7"]: DIGIT + "7",
  [DIGIT + "8"]: DIGIT + "8",
  [DIGIT + "9"]: DIGIT + "9",
  [DIGIT + "*"]: DIGIT + "*",
  [DIGIT + "-"]: DIGIT + "-",
  [DIGIT + "+"]: DIGIT + "+",
  [DIGIT + "="]: DIGIT + "=",
  [DIGIT + "Enter"]: DIGIT + "=",
  [DIGIT + "."]: DIGIT + ".",
  [DIGIT + "/"]: DIGIT + "/",
};

export class Calculator extends Component {
  state = { ...initialState };
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
      console.log(values);
    }
  }

  componentDidMount() {
    console.log(CALCULATOR_BUTTONS);
    (() => {
      function keyPressed(evt) {
        evt = evt || window.event;
        console.log(
          "🚀 ~ file: index.jsx ~ line 96 ~ Calculator ~ keyPressed ~ evt",
          evt
        );
        let key = evt.key || evt.which;

        if (!CALCULATOR_BUTTONS[DIGIT + key]) {
          return;
        }

        key = key === "Enter" ? "=" : key;

        document.getElementById(DIGIT + key).click();
        return String.fromCharCode(key);
      }

      document.onkeypress = function (evt) {
        keyPressed(evt);
      };
    })();
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}/`]}
          label="/"
          operation={true}
          click={this.setOperation}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}7`]}
          label="7"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}8`]}
          label="8"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}9`]}
          label="9"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}*`]}
          label="*"
          click={this.setOperation}
          operation
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}4`]}
          label="4"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}5`]}
          label="5"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}6`]}
          label="6"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}-`]}
          label="-"
          click={this.setOperation}
          operation
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}1`]}
          label="1"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}2`]}
          label="2"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}3`]}
          label="3"
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}+`]}
          label="+"
          click={this.setOperation}
          operation
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}0`]}
          label="0"
          click={this.addDigit}
          double
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}.`]}
          label="."
          click={this.addDigit}
        />
        <Button
          id={CALCULATOR_BUTTONS[`${DIGIT}=`]}
          label="="
          click={this.setOperation}
          operation
        />
      </div>
    );
  }
}
