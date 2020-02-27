import React from 'react';
import { Image } from 'react-native';
import logo from "../static/images/A2.png";
const AibonoLogo = () => {
return (
    <Image
    style={{width: 350, height: 70}}
    source={logo}
    resizeMode='center'
  />
)
}
export default AibonoLogo;