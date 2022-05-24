import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Post} from '@axios/AxiosInterceptorFunction';
import {moderateScale} from 'react-native-size-matters';
import {URL, apiHeader} from '@config/apiUrl';
import Logo from '@assets/Images/Svgs/Logo.svg';
import CustomText from '@components/common/CustomText';
import CustomButton from '@components/common/CustomButton';
import TextInputWithTitle from '@components/common/TextInputWithTitle';
import Toast from '@components/utils/Toast';
import validators from '@components/utils/Validators';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function SignupScreen(props) {
  const {navigation} = props;
  const Header = apiHeader(false, true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [pictureError, setPictureError] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const signUrl = URL('users/signup');

  const uploadImage = async () => {
    try {
      let pickerResult;
      pickerResult = await ImagePicker.openPicker({mediaType: 'photo'});
      if (pickerResult) {
        if (
          pickerResult.path.includes('.jpeg') ||
          pickerResult.path.includes('.jpg') ||
          pickerResult.path.includes('.png') ||
          pickerResult.path.includes('.JPG') ||
          pickerResult.path.includes('.PNG') ||
          pickerResult.path.includes('.JPEG') ||
          pickerResult.path.includes('.HEIC')
        ) {
          setPicture(pickerResult);
        } else {
          Toast.show({
            title: 'Picture Error',
            message: 'Image path is wrong',
            type: 'danger',
          });
        }
      }
    } catch (error) {
      Toast.show({
        title: 'Picture Error',
        message: 'Image not uploaded',
        type: 'danger',
      });
    }
  };

  const formData = () => {
    var formData = new FormData();

    formData.append('role', 'trainee');
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('fcmToken', '8hjasd74');
    formData.append('password', password);
    formData.append('passwordConfirm', password);
    formData.append('photo', {
      uri: picture.path,
      type: picture.mime,
      name: new Date() + '_image',
    });

    return formData;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (
      email?.length === 0 &&
      password?.length === 0 &&
      firstName.length === 0 &&
      lastName.length === 0 &&
      picture === undefined
    ) {
      setEmailError(true);
      setPasswordError(true);
      setLastNameError(true);
      setFirstNameError(true);
      setPictureError(true);
      setIsLoading(false);
    } else {
      if (!email || !validators.emailREX.test(String(email).toLowerCase())) {
        setEmailError(true);
        setIsLoading(false);
      } else if (!password || password?.length < 8) {
        setPasswordError(true);
        setIsLoading(false);
      } else if (!firstName) {
        setFirstNameError(true);
        setIsLoading(false);
      } else if (!lastName) {
        setLastNameError(true);
        setIsLoading(false);
      } else if (picture === undefined) {
        setPictureError(true);
        setIsLoading(false);
      } else if (email && password && firstName && lastName && picture) {
        const userData = await formData();
        const response = await Post(signUrl, userData, Header);
        Toast.show({
          title: 'whoopee! Registered Successfully',
          message: 'Verification link sent to your email',
        });
        navigation.navigate('Login');
        setEmailError(false);
        setPasswordError(false);
        setFirstNameError(false);
        setLastNameError(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={{flex: 0}} barStyle={'light-content'} />
      <Image
        style={styles.backgroundView}
        source={require('../../../assets/Images/onBoardImage.png')}
      />
      <View style={styles.frontView}>
        <View style={styles.textLayout}>
          <View style={styles.imageLayout}>
            <Logo />
          </View>
        </View>
        <KeyboardAwareScrollView
          style={[styles.buttonLayout]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          }}>
          <CustomText
            variant={'h2'}
            font={'bold'}
            gutterTop={40}
            color={'black'}
            style={{width: '100%'}}
            align={'left'}
            transform={'capitalize'}>
            Create An Account
          </CustomText>
          <CustomText
            variant={'h6'}
            font={'light'}
            gutterTop={10}
            gutterBottom={50}
            color={'#707070'}
            style={{width: '100%'}}
            align={'left'}
            transform={'capitalize'}>
            Sign Up To Continue
          </CustomText>

          <View style={[styles.profilePictureLayout, {position: 'relative'}]}>
            {picture?.path?.length == 0 ? (
              <Image
                style={styles.profileimage}
                source={require('../../../assets/Images/user.jpg')}
              />
            ) : (
              <Image
                style={styles.profileimage}
                source={{uri: picture?.path}}
              />
            )}
            <TouchableOpacity
              onPress={uploadImage}
              style={[
                {
                  position: 'absolute',
                  bottom: 10,
                  right: 0,
                },
              ]}>
              <Ionicons
                name="camera-sharp"
                style={[
                  {
                    backgroundColor: '#3B3C40',
                    padding: 5,
                    borderRadius: 20,
                    overflow: 'hidden',
                  },
                ]}
                color={'white'}
                size={25}
              />
            </TouchableOpacity>
          </View>

          <CustomText
            variant={'h5'}
            font={'light'}
            gutterTop={20}
            gutterBottom={30}
            color={'black'}
            align={'center'}
            transform={'capitalize'}>
            Upload Image
          </CustomText>
          {pictureError && (
            <CustomText
              variant={'body4'}
              font={'italic'}
              gutterTop={0}
              gutterBottom={0}
              color={'red'}
              align={'center'}
              transform={'none'}>
              Please upload image
            </CustomText>
          )}

          <TextInputWithTitle
            title={'First Name'}
            secureText={false}
            placeholder={'Enter FirstName'}
            onChangeText={text => {
              setFirstName(text);
            }}
            value={firstName}
            height={50}
            width={0.9}
            gutterTop={0}
            gutterBottom={20}
            borderColor={'#707070'}
            borderWidth={2}
            borderBottomWidth={2}
            formError={firstNameError}
            formErrorText={'Invalid Field'}
          />

          <TextInputWithTitle
            title={'Last Name'}
            secureText={false}
            placeholder={'Enter LastName'}
            onChangeText={text => {
              setLastName(text);
            }}
            value={lastName}
            height={50}
            width={0.9}
            gutterTop={0}
            gutterBottom={20}
            borderColor={'#707070'}
            borderWidth={2}
            borderBottomWidth={2}
            formError={lastNameError}
            formErrorText={'Invalid Field'}
          />

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
            value="Signup"
            bgColor={'#333333'}
            width={'95%'}
            size={'xmd'}
            height={50}
            color={'white'}
            borderRadius={100}
            borderColor={'black'}
            btnWrapperStyles={{marginRight: 10}}
            loader={isLoading}
            loaderColor={'white'}
            onPress={onSubmit}
            borderWidth={1.2}
          />
          <CustomText
            variant={'body2'}
            font={'light'}
            gutterTop={20}
            gutterBottom={35}
            color={'#707070'}
            align={'center'}
            transform={'capitalize'}>
            Already Have an account?
            <Text
              style={{textDecorationLine: 'underline'}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              Sign in
            </Text>
          </CustomText>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
export default SignupScreen;

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
  imageLayout: {
    position: 'absolute',
    top: 60,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    marginLeft: 15,
  },
  textLayout: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 60,
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
    marginBottom: 15,
  },

  profilePictureLayout: {
    alignContent: 'center',
    alignItems: 'center',
  },
  profileimage: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  uploadIcon: {
    color: 'white',
    alignSelf: 'center',
    bottom: 10,
    fontSize: 22,
    left: 30,
    backgroundColor: '#3B3C40',
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 50,
    padding: 4,
  },
  buttonLayout: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: moderateScale(50, 0.3),
    borderTopRightRadius: moderateScale(50, 0.3),
    paddingHorizontal: moderateScale(17, 0.3),
    paddingVertical: moderateScale(20, 0.3),
    marginBottom: 0,
    flexGrow: 0,
    overflow: 'scroll',
  },
});
