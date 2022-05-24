import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '@store/auth/authSlice';
import {clearPlans} from '@store/plans/planSlice';
import {clearClasses} from '@store/classes/classesSlice';
import Home from '@assets/Images/drawerIcons/home.svg';
import Phone from '@assets/Images/drawerIcons/phone.svg';
import Logout from '@assets/Images/drawerIcons/logout.svg';
import {clearUser} from '@store/user/userSlice';
import CustomText from '@components/common/CustomText';
import {imageUrl} from '@config/apiUrl';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const height = Dimensions.get('window').height;

const CustomDrawer = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  let picture = imageUrl + user?.user?.photo;

  const navigateProfile = () => {
    navigation.navigate('Profile');
    navigation.closeDrawer();
  };

  const switchScreen = route => {
    navigation.navigate(route);
    navigation.closeDrawer();
  };

  const logOutFunction = () => {
    dispatch(logOut());
    dispatch(clearPlans());
    dispatch(clearClasses());
    dispatch(clearUser());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 60 : 40,
        }}>
        <View style={styles.navigationLayout}>
          <View style={styles.bioView}>
            <TouchableOpacity
              style={styles.pictureView}
              onPress={navigateProfile}>
              {picture === undefined ? (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  imageStyle={{borderRadius: 120}}
                  source={require('../../../assets/Images/profile.jpg')}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  imageStyle={{borderRadius: 120}}
                  source={{uri: picture}}
                />
              )}
            </TouchableOpacity>
            <View style={styles.nameView}>
              <CustomText
                variant={'body1'}
                font={'boldItalic'}
                color={'white'}
                align={'left'}
                transform={'capitalize'}>
                {user?.user?.displayName}
              </CustomText>
            </View>
          </View>
        </View>

        <View style={{...styles.menuRow, marginTop: 30}}>
          <Pressable
            style={styles.itemLayout}
            onPress={() => {
              switchScreen('HomeScreen');
            }}>
            {({pressed}) => (
              <>
                <View>
                  <Home
                    fill={pressed ? 'white' : '#999797'}
                    height="30px"
                    width="30px"
                  />
                </View>
                <CustomText
                  variant={'body4'}
                  font={'regular'}
                  gutterTop={0}
                  color={pressed ? 'white' : '#999797'}
                  align={'left'}
                  transform={'capitalize'}
                  style={{paddingVertical: 15, paddingHorizontal: 15}}>
                  Home
                </CustomText>
              </>
            )}
          </Pressable>
        </View>

        <View style={styles.menuRow}>
          <Pressable
            style={styles.itemLayout}
            onPress={() => {
              switchScreen('Contact');
            }}>
            {({pressed}) => (
              <>
                <View>
                  <Phone
                    fill={pressed ? 'white' : '#999797'}
                    height="30px"
                    width="30px"
                  />
                </View>
                <CustomText
                  variant={'body4'}
                  font={'regular'}
                  gutterTop={0}
                  color={pressed ? 'white' : '#999797'}
                  align={'left'}
                  transform={'capitalize'}
                  style={{paddingVertical: 15, paddingHorizontal: 15}}>
                  Contact us
                </CustomText>
              </>
            )}
          </Pressable>
        </View>

        <View style={styles.logoutRow}>
          <Pressable style={styles.itemLogout} onPress={logOutFunction}>
            {({pressed}) => (
              <>
                <View>
                  <Logout
                    fill={pressed ? 'white' : '#999797'}
                    height="30px"
                    width="30px"
                  />
                </View>
                <CustomText
                  variant={'body4'}
                  font={'bold'}
                  gutterTop={0}
                  color={pressed ? 'white' : '#999797'}
                  align={'left'}
                  transform={'capitalize'}
                  style={{paddingVertical: 15, paddingHorizontal: 15}}>
                  LogOut
                </CustomText>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#161619',
    borderTopLeftRadius: 30,
  },
  navigationLayout: {
    width: '100%',
    paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    backgroundColor: '#1F1F22',
  },
  bioView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  pictureView: {
    height: 70,
    width: 70,
    borderWidth: 4,
    borderColor: '#303030',
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 200,
  },
  menuRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoutRow: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  itemLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1F1F22',
  },
  itemLogout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1F1F22',
  },
  nameView: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
});
