import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {URL, apiHeader, imageUrl} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import {updateUser} from '@store/user/userSlice';
import CustomButton from '@components/common/CustomButton';
import CustomText from '@components/common/CustomText';
import TextInputWithTitle from '@components/common/TextInputWithTitle';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Toast from '@components/utils/Toast';

const width = Dimensions.get('window').width;

function EditProfile(props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {navigation} = props;
  const headerProps = {
    isHeader: false,
    isSubHeader: true,
    subHeading: 'Profile',
  };
  const Header = apiHeader(false, true);
  const [cityError, setCityError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [picture, setPicture] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const updateURL = URL('users/updateMe');

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    city: '',
    address: '',
    pictureTest: '',
    photo: '',
  });

  useEffect(() => {
    setProfile({
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      contactNo: user?.user?.contact,
      city: user?.user?.city,
      address: user?.user?.address,
      photo: imageUrl + user?.user?.photo,
    });
  }, [props.navigation, isFocused]);

  let firstNameDefault = profile?.firstName;
  let lastNameDefault = profile?.lastName;
  let contactNoDefault = profile?.contactNo;
  let cityStateDefault = profile?.city;
  let addressDefault = profile?.address;
  let photoDefault = imageUrl + profile?.photo;

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
          setProfile({...profile, photo: pickerResult.path});
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

    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('contact', profile.contactNo);
    formData.append('address', profile.address);
    formData.append('city', profile.city);
    if (picture !== undefined) {
      formData.append('photo', {
        uri: profile?.photo,
        type: picture.mime,
        name: new Date() + '_image',
      });
    }
    return formData;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (profile?.firstName == undefined || profile?.firstName?.length == 0) {
      setFirstNameError(true);
      setIsLoading(false);
    }
    if (profile?.lastName == undefined || profile?.lastName?.length == 0) {
      setLastNameError(true);
      setIsLoading(false);
    }
    if (profile?.contactNo == undefined || profile?.contactNo?.length == 0) {
      setContactNumberError(true);
      setIsLoading(false);
    }
    if (profile?.city == undefined || profile?.city?.length == 0) {
      setCityError(true);
      setIsLoading(false);
    }
    if (profile?.address == undefined || profile?.address?.length == 0) {
      setAddressError(true);
      setIsLoading(false);
    } else if (
      profile.firstName &&
      profile.lastName &&
      profile.address &&
      profile.city &&
      profile.contactNo
    ) {
      try {
        const userData = await formData();
        const response = await Patch(updateURL, userData, Header);
        if (response !== undefined) {
          const user = response?.data?.data?.user;
          dispatch(updateUser(user));
          Toast.show({
            title: 'Hurrah!',
            message: 'Profile Updated Successfully',
            type: 'success',
          });
          setIsLoading(false);
          navigation.navigate('Profile');
        } else {
          setIsLoading(false);
          Toast.show({
            title: 'Ooops!',
            message: 'Profile Not Updated',
            type: 'danger',
          });
        }
      } catch (error) {
        Toast.show({
          title: 'Ooops!',
          message: 'Profile Not Updated',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 50 : 100,
        }}>
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.profilePictureLayout}>
            {profile?.photo === undefined || profile?.photo?.length === 0 ? (
              <Image
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: moderateScale(120, 0.3)}}
                source={{uri: photoDefault}}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: moderateScale(120, 0.3)}}
                source={{uri: profile.photo}}
              />
            )}
            <TouchableOpacity
              onPress={uploadImage}
              style={[
                {
                  position: 'absolute',
                  bottom: 10,
                  right: 5,
                },
              ]}>
              <Ionicons
                name="camera-sharp"
                size={25}
                color={'white'}
                style={[
                  {
                    backgroundColor: '#3B3C40',
                    padding: 5,
                    borderRadius: 20,
                    overflow: 'hidden',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          <CustomText
            variant={'body2'}
            font={'light'}
            gutterTop={moderateScale(10, 0.3)}
            gutterBottom={moderateScale(50, 0.3)}
            color={'white'}
            align={'center'}
            style={{width: '100%'}}
            transform={'capitalize'}>
            Upload Image
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.95,
            }}>
            <TextInputWithTitle
              secureText={false}
              placeholder={'Enter FirstName'}
              onChangeText={text => {
                setProfile({...profile, firstName: text});
              }}
              defaultValue={firstNameDefault}
              height={moderateScale(50, 0.3)}
              inputWidth={0.35}
              width={0.45}
              gutterTop={0}
              gutterBottom={20}
              inputContainerStyles={{borderRadius: moderateScale(5, 0.3)}}
              formErrorText={'Empty Field'}
              formError={firstNameError}
              backgroundColor={'#242424'}
              color={'white'}
              placeholdercolor={'white'}
            />
            <TextInputWithTitle
              secureText={false}
              placeholder={'Enter LastName'}
              onChangeText={text => {
                setProfile({...profile, lastName: text});
              }}
              defaultValue={lastNameDefault}
              height={moderateScale(50, 0.3)}
              inputWidth={0.4}
              width={0.45}
              gutterTop={0}
              gutterBottom={moderateScale(20, 0.3)}
              inputContainerStyles={{borderRadius: moderateScale(5, 0.3)}}
              formErrorText={'Empty Field'}
              formError={lastNameError}
              backgroundColor={'#242424'}
              color={'white'}
              placeholdercolor={'white'}
            />
          </View>
          <TextInputWithTitle
            secureText={false}
            placeholder={'Enter Contact Number'}
            onChangeText={text => {
              setProfile({...profile, contactNo: text});
            }}
            defaultValue={contactNoDefault}
            height={moderateScale(50, 0.3)}
            width={0.95}
            gutterTop={0}
            gutterBottom={moderateScale(20, 0.3)}
            inputContainerStyles={{borderRadius: moderateScale(5, 0.3)}}
            formError={contactNumberError}
            formErrorText={'Empty Field'}
            backgroundColor={'#242424'}
            color={'white'}
            placeholdercolor={'white'}
          />
          <TextInputWithTitle
            secureText={false}
            placeholder={'Enter Street Address'}
            onChangeText={text => {
              setProfile({...profile, address: text});
            }}
            defaultValue={addressDefault}
            width={0.95}
            gutterTop={0}
            gutterBottom={moderateScale(20, 0.3)}
            inputContainerStyles={{borderRadius: moderateScale(5, 0.3)}}
            formError={addressError}
            formErrorText={'Empty Field'}
            backgroundColor={'#242424'}
            color={'white'}
            placeholdercolor={'white'}
          />
          <TextInputWithTitle
            secureText={false}
            placeholder={'Enter city'}
            onChangeText={text => {
              setProfile({...profile, city: text});
            }}
            defaultValue={cityStateDefault}
            height={50}
            width={0.95}
            gutterTop={0}
            gutterBottom={20}
            inputContainerStyles={{borderRadius: moderateScale(5, 0.3)}}
            formError={cityError}
            formErrorText={'Empty Field'}
            backgroundColor={'#242424'}
            color={'white'}
            placeholdercolor={'white'}
          />
          <CustomButton
            value="Save Changes"
            bgColor={'#707070'}
            width={'95%'}
            size={'xmd'}
            height={moderateScale(50, 0.3)}
            color={'white'}
            placeholdercolor={'white'}
            borderRadius={moderateScale(100, 0.3)}
            onPress={onSubmit}
            loaderColor={'white'}
            borderWidth={1.2}
            loader={isLoading}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default EditProfile;

const styles = ScaledSheet.create({
  container: {
    width: width,
    marginTop: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  buttonLayout: {
    width: '100%',
    marginBottom: 0,
    flexGrow: 0,
    overflow: 'scroll',
    paddingBottom: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(17, 0.3),
  },
  profilePictureLayout: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: moderateScale(165, 0.3),
    height: moderateScale(165, 0.3),
    borderRadius: moderateScale(120, 0.3),
    borderWidth: moderateScale(4, 0.3),
    borderColor: '#303030',
  },
  uploadIcon: {
    color: 'white',
    alignSelf: 'center',
    fontSize: moderateScale(22, 0.6),
    left: moderateScale(50, 0.3),
    backgroundColor: '#707070',
    width: moderateScale(30, 0.3),
    height: moderateScale(30, 0.3),
    marginLeft: moderateScale(10, 0.3),
    borderRadius: moderateScale(100, 0.3),
    padding: moderateScale(4, 0.3),
  },
});
