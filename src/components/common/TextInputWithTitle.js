import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  I18nManager,
  Platform,
} from 'react-native';

import {Icon} from 'native-base';
import Color from '../../assets/Utilities/Color';
import {useState} from 'react';
import {moderateScale, scale, ScaledSheet} from 'react-native-size-matters';
import CustomText from './CustomText';

const TextInputWithTitle = props => {
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');

  const handleChangeText = text => {
    setValue(text);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };
  const {
    placeholder = 'Type here...',
    height = 0,
    width = 0,
    color = 'black',
    inputHeight = 100,
    inputWidth = 0.85,
    inputContainerStyles,
    gutterTop = 0,
    gutterBottom = 0,
    backgroundColor = 'white',
    elevation = 0,
    borderBottomWidth = 0,
    borderColor = 'white',
    borderWidth = 0,
    placeholdercolor = 'black',
    borderRadius = 0,
    multiline = false,
    numberOfLines,
    formError,
    formErrorText,
    title,
    errorMTop = -15,
    errorMBottom = 10,
  } = props;
  return (
    <View>
      {title && (
        <CustomText
          variant={'body2'}
          font={'bold'}
          gutterTop={1}
          gutterBottom={2}
          color={'black'}
          align={'left'}
          transform={'capitalize'}>
          {title}
        </CustomText>
      )}

      <View
        style={[
          styles.fieldSet,
          {
            width: screenWidth * width,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
            borderColor: borderColor,
            borderBottomWidth: borderBottomWidth,
            elevation: elevation,
            backgroundColor: backgroundColor,
          },
          height && {
            height: height,
          },
          gutterTop >= 0 && {
            marginTop: gutterTop,
          },
          gutterBottom >= 0 && {
            marginBottom: gutterBottom,
          },
          props.alignItems && {
            alignItems: props.alignItems,
          },
          inputContainerStyles,
        ]}>
        {props.iconName && (
          <Icon
            name={props.iconName}
            type={props.iconType}
            style={[
              {
                color: props.color ? props.color : '#6d1ca0',
                // color: Color.iconRed,
                // fontSize:
                //   Platform.OS === 'android'
                //     ? Dimensions.get('window').width * 0.04
                //     : Dimensions.get('window').width * 0.045,
                // fontSize: scale(18),
                fontSize: moderateScale(18, 0.6),
                // paddingLeft: Dimensions.get('window').width * 0.04,
              },
              props.numberOfLines > 1 && {
                paddingTop: Dimensions.get('window').height * 0.005,
              },
              props.iconHeigth && {
                height: screenHeight * props.iconHeigth,
              },
            ]}
          />
        )}

        {props.secureText ? (
          <>
            <TextInput
              style={[
                {
                  width: screenWidth * inputWidth,
                  color: color,
                },
                Platform.OS === 'android'
                  ? styles.inputBox
                  : [styles.inputBox, {paddingBottom: 0}],
              ]}
              onChangeText={e => handleChangeText(e)}
              value={props.value}
              secureTextEntry={!showPassword}
              placeholder={placeholder}
              placeholderTextColor={placeholdercolor}
              keyboardType={props.keyboardType}
            />
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{
                paddingHorizontal: Dimensions.get('window').width * 0.04,
                position: 'absolute',
                right: 0,
                height:
                  Platform.OS === 'android'
                    ? Dimensions.get('window').height * 0.0725
                    : Dimensions.get('window').height * 0.0525,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                type={'FontAwesome5'}
                style={{
                  color: Color.gray,
                  // fontSize:
                  //   Platform.OS === 'android'
                  //     ? Dimensions.get('window').width * 0.04
                  //     : Dimensions.get('window').width * 0.045,
                  // fontSize: scale(18),
                  fontSize: moderateScale(18, 0.6),
                }}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TextInput
            style={[
              {
                width: screenWidth * inputWidth,
                color: color,
              },
              Platform.OS === 'android'
                ? styles.inputBox
                : [styles.inputBox, {paddingBottom: 0}],
              props.numberOfLines > 1 && {
                textAlignVertical: 'top',
              },
              props.inputHeight && {
                height: inputHeight,
              },
              props.disable && {
                color: Color.gray,
              },
              multiline && {
                paddingTop: moderateScale(10, 0.5),
              },
            ]}
            onChangeText={e => handleChangeText(e)}
            value={props.value || props.defaultValue}
            placeholder={placeholder}
            placeholderTextColor={placeholdercolor}
            keyboardType={props.keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines || 1}
            editable={props.disable ? false : true}
            keyboardShouldPersistTaps="always"
            // textAlignVertical={props.textAlignVertical}
          />
        )}
      </View>
      {formError && (
        <CustomText
          variant={'body4'}
          font={'italic'}
          gutterTop={errorMTop}
          gutterBottom={errorMBottom}
          color={'red'}
          align={'left'}
          transform={'none'}>
          {formErrorText}
        </CustomText>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  fieldSet: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.06,
    backgroundColor: Color.black,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    // elevation: 6,
  },
  inputBox: {
    paddingLeft: moderateScale(8, 0.6),
    borderRadius: 8,
    minHeight: Dimensions.get('window').height * 0.05,
    // fontSize:
    //   Dimensions.get('window').width > 768
    //     ? Dimensions.get('window').width * 0.025
    //     : Dimensions.get('window').width * 0.04,
    // fontSize: scale(12),
    fontSize: moderateScale(12, 0.3),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    // color: 'red',
  },
});
export default TextInputWithTitle;
