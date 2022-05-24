import React from 'react';
import {View, Dimensions, ScrollView, Image} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CustomText from '@components/common/CustomText';
import CustomButton from '@components/common/CustomButton';
import {imageUrl} from '@config/apiUrl';

const width = Dimensions.get('window').width;

function Profile(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);
  const headerProps = {
    isHeader: false,
    isSubHeader: true,
    subHeading: 'Settings',
  };
  let userPhoto = imageUrl + user?.user?.photo;
  const navigateEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom:
            Platform.OS === 'ios'
              ? moderateScale(100, 0.3)
              : moderateScale(40, 0.3),
          alignItems: 'center',
        }}>
        <CustomText
          variant={'h3'}
          font={'medium'}
          color={'#888888'}
          align={'center'}
          gutterTop={moderateScale(20, 0.3)}
          gutterBottom={moderateScale(10, 0.3)}
          numberOfLines={1}
          ellipsizeMode="tail"
          transform={'capitalize'}>
          Profile
        </CustomText>
        <View style={styles.profilePictureLayout}>
          {userPhoto ? (
            <Image
              resizeMode="cover"
              style={styles.profileimage}
              imageStyle={{borderRadius: moderateScale(120, 0.3)}}
              source={{uri: userPhoto}}
            />
          ) : (
            <Image
              resizeMode="cover"
              style={styles.profileimage}
              source={require('@assets/Images/profilePic.jpg')}
            />
          )}
        </View>
        <View style={styles.boxLayout}>
          <View style={styles.rowLayout}>
            <Entypo
              name="user"
              color={'#ABABAB'}
              size={moderateScale(25, 0.6)}
              style={{
                justifyContent: 'center',
                marginLeft: moderateScale(2, 0.3),
              }}
            />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'#B6B5B3'}
              align={'left'}
              style={{marginLeft: moderateScale(10, 0.3), maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'capitalize'}>
              {user?.user?.firstName + ' ' + user?.user?.lastName ||
              user?.user?.firstName.length >
                0 + ' ' + user?.user?.lastName.lenght >
                0
                ? user?.user?.firstName + ' ' + user?.user?.lastName
                : 'Enter Name...'}
            </CustomText>
          </View>
          <View style={styles.rowLayout}>
            <FontAwesome
              name="envelope-o"
              color={'#ABABAB'}
              size={moderateScale(25, 0.6)}
            />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'#B6B5B3'}
              align={'left'}
              style={{marginLeft: moderateScale(10, 0.3), maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'none'}>
              {user?.user?.email || user?.user?.email.lenght > 0
                ? user?.user?.email
                : 'Enter Email'}
            </CustomText>
          </View>
          <View style={styles.rowLayout}>
            <FontAwesome
              name="phone"
              color={'#ABABAB'}
              size={moderateScale(25, 0.6)}
            />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'#B6B5B3'}
              align={'left'}
              style={{marginLeft: moderateScale(15, 0.3), maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'capitalize'}>
              {user?.user?.contact || user?.user?.contact.length > 0
                ? user?.user?.contact
                : 'Enter contact...'}
            </CustomText>
          </View>
          <View style={styles.rowLayout}>
            <FontAwesome
              name="address-card"
              color={'#ABABAB'}
              size={moderateScale(25, 0.6)}
            />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'#B6B5B3'}
              align={'left'}
              style={{marginLeft: moderateScale(10, 0.3), maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'capitalize'}>
              {user?.user?.address || user?.user?.address.length > 0
                ? user?.user?.address
                : 'Enter address...'}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.rowLayout,
              borderBottomWidth: 0,
            }}>
            <Entypo
              name="location-pin"
              color={'#ABABAB'}
              size={moderateScale(30, 0.6)}
            />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'#B6B5B3'}
              align={'left'}
              style={{marginLeft: moderateScale(10, 0.3), maxWidth: '87%'}}
              transform={'capitalize'}>
              {user?.user?.city || user?.user?.city.length > 0
                ? user?.user?.city
                : 'Enter city...'}
            </CustomText>
          </View>
        </View>
        <View style={styles.buttonLayout}>
          <CustomButton
            value="Edit"
            bgColor={'#888888'}
            width={'40%'}
            size={'xmd'}
            height={moderateScale(50, 0.3)}
            gutterTop={moderateScale(20, 0.3)}
            color={'white'}
            borderRadius={moderateScale(100, 0.3)}
            borderColor={'#000000'}
            loaderColor={'black'}
            onPress={navigateEdit}
            font={'regular'}
          />
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default Profile;
const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  boxLayout: {
    backgroundColor: '#242424',
    borderWidth: moderateScale(1, 0.3),
    width: width * 0.9,
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.3),
    height: moderateScale(60, 0.3),
  },
  buttonLayout: {
    width: width * 0.9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profilePictureLayout: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(25, 0.3),
    height: moderateScale(165, 0.3),
    width: moderateScale(165, 0.3),
    borderRadius: moderateScale(120, 0.3),
    borderWidth: moderateScale(4, 0.3),
    borderColor: '#303030',
  },
  profileimage: {
    height: moderateScale(150, 0.3),
    width: moderateScale(150, 0.3),
    borderRadius: moderateScale(200, 0.3),
  },
});
