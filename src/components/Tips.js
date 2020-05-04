import React from 'react';
import {Modal, View, Dimensions} from 'react-native';
import { Svg, Defs, Rect, Mask, Circle, Use } from 'react-native-svg';
import PropTypes from 'prop-types';
import styles from '../config/styles';
import Text from './Text';
import Button from './Button';
import strings from '../config/localization';

class Tips extends React.Component {
  state = {
    bottomPosition: 25
  }

  componentDidMount = () => {
    const {screen} = this.props;
    if (screen === 'discoverRooms') {
      this.setState({
        bottomPosition: Dimensions.get('screen').height/2
      });
    }
  }
  renderCircle = (screen) => {
    const width = Dimensions.get('window').width, height = Dimensions.get('window').height;
    switch (screen) {
      case 'matchScreen':
        return (
          <Defs>
            <Mask id="mask" x="0" y="0" height={height} width={width}>
              <Rect height="100%" width="100%" fill="white" />
              <Circle id="Circle" r={width/2} cx={width/2} cy={height - width/2 - 155 - 155} stroke="green" strokeWidth="4" />
            </Mask>
            <Circle id="Circle" r={width/2} cx={width/2} cy={height - width/2 - 155 - 155} stroke="green" strokeWidth="4" />
          </Defs>
        );
      
      case 'discoverRooms':
        return (
          <Defs>
            <Mask id="mask" x="0" y="0" height={height} width={width}>
              <Rect height="100%" width="100%" fill="white" />
              <Circle id="Circle" r={100} cx={width/2} cy={height - width/3} stroke="green" strokeWidth="4" />
            </Mask>
            <Circle id="Circle" r={100} cx={width/2} cy={height - width/3} stroke="green" strokeWidth="4" />
          </Defs>
        )
      default:
        return null;
    }
  }
  render(){
    const {onRequestClose, visible, screen, title} = this.props;
    const {bottomPosition} = this.state;
    const width = Dimensions.get('window').width, height = Dimensions.get('window').height;
    return (
      <View>
        <Modal visible={visible} onRequestClose={onRequestClose} transparent>
          <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
            {this.renderCircle(screen)}
            <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.9)" mask="url(#mask)" fill-opacity="0" />
            <Use href="#Circle" fill="none" />
          </Svg>
          <View style={[styles.main.dialogContentContainer, {position:'absolute', alignSelf:'center', bottom: bottomPosition}]}> 
            <Text style={styles.main.dialogContentText}>{title}</Text>
            <Button onPress={onRequestClose} title={strings.gotIt} />            
          </View>
        </Modal>
      </View>
    )
  }
}

Tips.PropTypes = {
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
  screen: PropTypes.string
}

Tips.defaultProps = {
  onRequestClose: () => {},
  visible: false,
  screen: ''
}
export default Tips;