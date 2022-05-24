import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '@store/auth/authSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale} from 'react-native-size-matters';
import {getUserData} from '@store/user/userSlice';
import {URL} from '@config/apiUrl';
import {Post} from '@axios/AxiosInterceptorFunction';
import Logo from '@assets/Images/Svgs/Logo.svg';
import CustomText from '@components/common/CustomText';
import CustomButton from '@components/common/CustomButton';
import TextInputWithTitle from '@components/common/TextInputWithTitle';
import Toast from '@components/utils/Toast';
import validators from '@components/utils/Validators';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function LoginScreen(props) {
  const dispatch = useDispatch();
  const loginURL = URL('users/login');
  const {navigation} = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const userData = {
      email,
      password,
    };
    if (email?.length === 0 && password?.length === 0) {
      setEmailError(true);
      setPasswordError(true);
      setIsLoading(false);
    } else {
      if (!email || !validators.emailREX.test(String(email).toLowerCase())) {
        setEmailError(true);
        setIsLoading(false);
      } else if (!password || password?.length < 8) {
        setPasswordError(true);
        setIsLoading(false);
      } else if (email && password) {
        const response = await Post(loginURL, userData);
        const user = response?.data;
        if (user !== undefined) {
          Toast.show({
            title: 'whoopee!',
            message: 'Logged In Successfully',
          });
          dispatch(login(user));
          dispatch(getUserData(user));
          setIsLoading(false);
        }
        setEmailError(false);
        setPasswordError(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.backgroundView}
          source={require('../../../assets/Images/onBoardImage.png')}
        />
      </View>
      <View style={styles.scrollView}>
        <View style={styles.imageView}>
          <View style={styles.imageLogo}>
            <Logo />
          </View>
        </View>
        <KeyboardAwareScrollView
          style={styles.buttonLayout}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          }}>
          <CustomText
            variant={'h2'}
            font={'bold'}
            gutterTop={40}
            color={'black'}
            align={'left'}
            style={{width: '100%'}}
            transform={'capitalize'}>
            Sign In Account
          </CustomText>
          <CustomText
            variant={'h6'}
            font={'light'}
            gutterTop={20}
            gutterBottom={50}
            style={{width: '100%'}}
            color={'#707070'}
            align={'left'}
            transform={'capitalize'}>
            Sign in To Continue
          </CustomText>
          <TextInputWithTitle
            title={'Email'}
            secureText={false}
            placeholder={'Enter Email'}
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
            height={50}
            width={0.9}
            gutterTop={0}
            gutterBottom={20}
            borderColor={'#707070'}
            borderWidth={2}
            borderBottomWidth={2}
            formError={emailError}
            formErrorText={'Kindly enter valid email'}
          />
          <TextInputWithTitle
            title={'Password'}
            secureText={true}
            placeholder={'Enter Password'}
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
            width={0.9}
            gutterTop={0}
            gutterBottom={20}
            borderColor={'#707070'}
            borderWidth={2}
            borderBottomWidth={2}
            formError={passwordError}
            formErrorText={'Password is less than 8 characters'}
          />
          <CustomButton
            value="Login"
            bgColor={'#333333'}
            width={'95%'}
            size={'xmd'}
            height={50}
            color={'white'}
            borderRadius={100}
            borderColor={'black'}
            loader={isLoading}
            btnWrapperStyles={{marginRight: 10}}
            loaderColor={'white'}
            onPress={onSubmit}
            borderWidth={1.2}
          />
          <CustomText
            variant={'body2'}
            font={'light'}
            gutterTop={20}
            gutterBottom={10}
            color={'#707070'}
            align={'center'}
            transform={'capitalize'}>
            Don't Have an account?
            <Text
              style={{textDecorationLine: 'underline'}}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              Sign up
            </Text>
          </CustomText>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundView: {
    height: height,
    width: width,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  frontView: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  imageView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 60,
    alignItems: 'center',
    width: '100%',
    // marginBottom: 40,
  },
  imageLogo: {
    marginTop: 80,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    marginLeft: 15,
  },
  buttonLayout: {
    backgroundColor: 'white',
    borderTopLeftRadius: moderateScale(50, 0.3),
    borderTopRightRadius: moderateScale(50, 0.3),
    paddingHorizontal: moderateScale(17, 0.3),
    paddingVertical: moderateScale(20, 0.3),
    flexGrow: 0,
    overflow: 'scroll',
    paddingBottom: 10,
  },
});
