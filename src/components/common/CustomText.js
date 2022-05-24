import React from 'react';
import {Text, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  extraLargeTitle: moderateScale(42, 0.3),
  largeTitle: moderateScale(40, 0.3),
  h0: moderateScale(36, 0.3),
  h1: moderateScale(32, 0.3),
  h2: moderateScale(28, 0.3),
  h3: moderateScale(24, 0.3),
  h4: moderateScale(22, 0.3),
  h5: moderateScale(20, 0.3),
  h6: moderateScale(18, 0.3),
  body1: moderateScale(18, 0.3),
  body2: moderateScale(16, 0.3),
  body3: moderateScale(14, 0.3),
  body4: moderateScale(12, 0.3),
  body5: moderateScale(10, 0.3),
  small: moderateScale(8, 0.3),
};
export const FONTVARIANTS = {
  extraLargeTitle: {fontSize: SIZES.extraLargeTitle},
  largeTitle: {fontSize: SIZES.largeTitle},
  h0: {fontSize: SIZES.h0, lineHeight: moderateScale(38, 0.3)},
  h1: {fontSize: SIZES.h1, lineHeight: moderateScale(36, 0.3)},
  h2: {fontSize: SIZES.h2, lineHeight: moderateScale(30, 0.3)},
  h3: {fontSize: SIZES.h3, lineHeight: moderateScale(26, 0.3)},
  h4: {fontSize: SIZES.h4, lineHeight: moderateScale(22, 0.3)},
  h5: {fontSize: SIZES.h5, lineHeight: moderateScale(20, 0.3)},
  h6: {fontSize: SIZES.h6, lineHeight: moderateScale(18, 0.3)},
  body1: {fontSize: SIZES.body1, lineHeight: moderateScale(19, 0.3)},
  body2: {fontSize: SIZES.body2, lineHeight: moderateScale(18, 0.3)},
  body3: {fontSize: SIZES.body3, lineHeight: moderateScale(16, 0.3)},
  body4: {fontSize: SIZES.body4, lineHeight: moderateScale(14, 0.3)},
  body5: {fontSize: SIZES.body5, lineHeight: moderateScale(12, 0.3)},
  small: {fontSize: SIZES.small, lineHeight: moderateScale(10, 0.3)},
};
export const FONTSSTYLE = {
  regular: {
    fontFamily: Platform.OS === 'android' ? 'roboto_regular' : 'Roboto-Regular',
  },
  light: {
    fontFamily: Platform.OS === 'android' ? 'roboto_light' : 'Roboto-Light',
  },
  italic: {
    fontFamily: Platform.OS === 'android' ? 'roboto_italic' : 'Roboto-Italic',
  },
  thin: {fontFamily: Platform.OS === 'android' ? 'roboto_thin' : 'Roboto-Thin'},
  thinItalic: {
    fontFamily:
      Platform.OS === 'android' ? 'roboto_thinitalic' : 'Roboto-ThinItalic',
  },
  bold: {fontFamily: Platform.OS === 'android' ? 'roboto_bold' : 'Roboto-Bold'},
  boldItalic: {
    fontFamily:
      Platform.OS === 'android' ? 'roboto_bolditalic' : 'Roboto-BoldItalic',
  },
  medium: {
    fontFamily: Platform.OS === 'android' ? 'roboto_medium' : 'Roboto-Medium',
  },
  mediumItalic: {
    fontFamily:
      Platform.OS === 'android' ? 'roboto_mediumitalic' : 'Roboto-MediumItalic',
  },
  underline: {
    fontFamily: Platform.OS === 'android' ? 'roboto_light' : 'Roboto-Light',
    textDecorationLine: 'underline',
  },
};

const CustomText = props => {
  const {
    children,
    numberOfLines,
    style,
    variant,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    align = 'auto',
    transform = 'none',
    font = '',
    letterSpacing = 0,
    top = 0,
  } = props;
  return (
    <Text
      style={[
        {
          marginTop: gutterTop,
          marginBottom: gutterBottom,
          color: color,
          textAlign: align,
          textTransform: transform,
          letterSpacing: letterSpacing,
          top: top,
        },
        style,
        variant && FONTVARIANTS[variant],
        font && FONTSSTYLE[font],
      ]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default CustomText;
