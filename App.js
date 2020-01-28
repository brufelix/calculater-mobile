import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './components/Button'
import Display from './components/Display'

const initState = {
  displayValue: '0',
  values: [0,0],
  operation: null,
  clearMemory: false,
  current: 0
}

export default class App extends Component {

  state = { ...initState };

  addOperator = operation => {
    if (this.state.current === 0){
      this.setState( {operation, clearMemory: true, current: 1} );
    }else{
      const equal = operation === '='; 
      const values = [...this.state.values];
      try{
        console.debug(`${this.state.values[0]} ${this.state.operation} ${this.state.values[1]}`);
        values[0] = eval(`${this.state.values[0]} ${this.state.operation} ${this.state.values[1]}`);
      }catch(e){
        values[0] = this.state.values[0];
    }
      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equal ? null : operation,
        current: equal ? 0 : 1,
        clearMemory: true,
        values
      });
    }
  }

  addDigit = digit => {
    const clearDisplay = this.state.displayValue === '0' || this.state.clearMemory;
    if (digit === '.' && !clearDisplay && this.state.displayValue.includes('.')){
      return;
    }
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + digit;
    this.setState({displayValue, clearMemory : false});

    if(digit !== '.'){
      const newValue = parseFloat(digit);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({values});
    }
  }

  clearMemory = () => {
    this.setState( {...initState} );
  }

  render(){
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue}/>
        <View style={styles.button}>
          <Button label='AC' buttonClear onPress={() => this.clearMemory()}/>
          <Button label='0' onPress={() => this.addDigit('0')}/>
          <Button label='x'buttonOperation onPress={() => this.addOperator('*')}/>
          <Button label='7'onPress={() => this.addDigit('7')}/>
          <Button label='8'onPress={() => this.addDigit('8')}/>
          <Button label='9'onPress={() => this.addDigit('9')}/>
          <Button label='/'buttonOperation onPress={() => this.addOperator('/')}/>
          <Button label='4'onPress={() => this.addDigit('4')}/>
          <Button label='5'onPress={() => this.addDigit('5')}/>
          <Button label='6' onPress={() => this.addDigit('6')}/>
          <Button label='+' buttonOperation onPress={() => this.addOperator('+')}/>
          <Button label='1' onPress={() => this.addDigit('1')}/>
          <Button label='2' onPress={() => this.addDigit('2')}/>
          <Button label='3' onPress={() => this.addDigit('3')}/>
          <Button label='-' buttonOperation onPress={() => this.addOperator('-')}/>
          <Button label='=' buttonEqual onPress={() => this.addOperator('=')}/>
          <Button label='.' onPress={() => this.addDigit('.')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});