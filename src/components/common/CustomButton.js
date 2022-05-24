import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomText from './CustomText';

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
  h0: {fontSize: SIZES.h0, lineHeight: 38},
  h1: {fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontSize: SIZES.h3, lineHeight: 26},
  h4: {fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontSize: SIZES.h5, lineHeight: 20},
  h6: {fontSize: SIZES.h6, lineHeight: 18},
  body1: {fontSize: SIZES.body1, lineHeight: 19},
  body2: {fontSize: SIZES.body2, lineHeight: 18},
  body3: {fontSize: SIZES.body3, lineHeight: 16},
  body4: {fontSize: SIZES.body4, lineHeight: 14},
  body5: {fontSize: SIZES.body5, lineHeight: 12},
  small: {fontSize: SIZES.small, lineHeight: 10},
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
const CustomButton = props => {
  const sizes = {sm: 28, md: 32, xmd: 42, lg: 56};

  const {
    size,
    btnWrapperStyles,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    loader = false,
    loaderColor = 'white',
    borderColor = 'black',
    bgColor = 'white',
    borderWidth = 0,
    fontSize = 15,
    textStyles,
    font = 'light',
    variant,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.9}
      onPress={props.onPress}
      style={[
        styles.mainBtn,
        {
          width: props.width,
          height: sizes[size],
          backgroundColor: bgColor,
          borderColor: borderColor,
          marginTop: gutterTop,
          marginBottom: gutterBottom,
          borderWidth: borderWidth,
        },
        btnWrapperStyles,
        props.justifyContent && {
          justifyContent: props.justifyContent,
        },
        props.borderRadius && {
          borderRadius: props.borderRadius,
        },
      ]}>
      <CustomText
        style={[
          styles.buttonText,
          {
            fontSize: fontSize,
            color: color,
          },
          variant && FONTVARIANTS[variant],
          font && FONTSSTYLE[font],
          textStyles,
        ]}>
        {!loader && props.value}
      </CustomText>
      {loader && (
        <ActivityIndicator
          style={styles.indicatorStyle}
          size="small"
          color={loaderColor}
        />
      )}

      {props.iconName && (
        <Icon
          name={props.iconName}
          type={props.iconType}
          style={[styles.iconCustom, props.iconStyle && props.iconStyle]}
        />
      )}
      <CustomText
        style={[
          styles.text,
          {color: props.textColor, fontSize: scale(15)},
          props.textTransform && {
            textTransform: props.textTransform,
          },
        ]}>
        {props.text}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
  iconCustom: {
    color: '#C0C0C0',
    fontSize: 20,
    paddingRight: 20,
    paddingLeft: I18nManager.isRTL ? 20 : 0,
  },
});

export default CustomButton;
