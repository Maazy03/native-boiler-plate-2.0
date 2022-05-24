import React from 'react';
import {View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import CustomText from '@components/common/CustomText';
import CustomButton from '@components/common/CustomButton';
import Logo from '@assets/Images/Svgs/Logo.svg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function OnBoardingScreen(props) {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/Images/onBoardImage.png')}
        style={styles.backgroundImage}>
        <View style={styles.mainLayout}>
          <View style={styles.textLayout}>
            <View style={styles.imageLayout}>
              <Logo />
            </View>
            <View>
              <CustomText
                variant={'h1'}
                font={'boldItalic'}
                gutterTop={10}
                color={'white'}
                align={'center'}
                transform={'uppercase'}>
                GET FIT
              </CustomText>

              <CustomText
                variant={'body5'}
                font={'light'}
                gutterBottom={2}
                color={'white'}
                align={'center'}>
                Change yourself and try your workout at
              </CustomText>
              <CustomText
                variant={'body5'}
                color={'white'}
                align={'center'}
                font={'light'}>
                Our Gym
              </CustomText>
            </View>
          </View>
          <View style={styles.buttonLayout}>
            <CustomButton
              value="Register"
              bgColor={'#888888'}
              width={'90%'}
              height={50}
              size={'xmd'}
              gutterBottom={26}
              borderRadius={100}
              onPress={() => navigation.navigate('Signup')}
            />
            <CustomButton
              value="Login"
              bgColor={'#333333'}
              width={'90%'}
              size={'xmd'}
              height={50}
              borderRadius={100}
              borderColor={'white'}
              onPress={() => navigation.navigate('Login')}
              btnWrapperStyles={{
                borderWidth: 2,
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  mainLayout: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  imageLayout: {
    marginTop: 80,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    marginLeft: 15,
  },
  textLayout: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    alignItems: 'center',
    width: '100%',
  },
  buttonLayout: {
    width: '100%',
    height: '35%',
    backgroundColor: '#333333',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
