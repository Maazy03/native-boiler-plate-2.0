import {Dimensions} from 'react-native';

const containerWidth = Dimensions.get('window').width;
const containerHeight = Dimensions.get('window').height;
import {moderateScale} from 'react-native-size-matters';

// const initialScale = Math.min(containerWidth, containerHeight) / 375;
const unit = {
  scale: value => moderateScale(value, 0.3),
  //   fontSize: (multi?) => (multi ? initialScale * 16 * multi : initialScale * 16),
  //   windowHeight: (multi?: number) =>
  //     multi ? containerHeight * multi : containerHeight,
  //   windowWidth: (multi?: number) =>
  //     multi ? containerWidth * multi : containerWidth,
  //   screenHeader: () => initialScale * 48,
};

export default unit;
