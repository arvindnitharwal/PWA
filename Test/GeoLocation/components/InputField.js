import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
class InputField extends Component {
  render() {
    const {
        labelText,
        labelTextSize,
        labelColor,
        textColor,
        borderBottomColor,
        inputType,
        customStyle,
        onChange
      } = this.props;
      const color = labelColor || colors.white;
      const fontSize = labelTextSize || 14;
      const inputColor = textColor || colors.white;
      const borderBottom = borderBottomColor || "transparent";
    return (
        <View style={[customStyle, styles.wrapper]}>
        <Text style={[{ color, fontSize }, styles.label]}>{labelText}</Text>
        <TextInput
          autoCorrect={false}
          style={[
            { color: inputColor, borderBottomColor: borderBottom },
            styles.inputFiled
          ]}
          secureTextEntry={inputType === "password"}
          onChangeText={text => onChange(text)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    wrapper: {
      display: "flex"
    },
    label: { fontWeight: "700", marginBottom: 10 },
    inputFiled: {
      borderBottomWidth: 1,
      paddingTop: 5,
      paddingBottom: 5
    }
  });
  export default InputField;