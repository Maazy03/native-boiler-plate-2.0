import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomText from '../../common/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

function SubHeaderComponent(props) {
  const {navigation, headerProps} = props;

  const {mainHeading, subHeading, isRightIcon = false} = headerProps;
  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={back} style={{padding: 5}}>
        <FontAwesome5 name="arrow-left" color={'white'} size={25} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginRight: isRightIcon ? 0 : 30,
        }}>
        {mainHeading && (
          <CustomText
            variant={'body3'}
            font={'light'}
            gutterTop={5}
            color={'#707070'}
            align={'left'}
            transform={'capitalize'}>
            {mainHeading}
          </CustomText>
        )}
        {subHeading && (
          <CustomText
            variant={'h4'}
            font={'bold'}
            color={'white'}
            gutterTop={5}
            align={'left'}
            transform={'capitalize'}>
            {subHeading}
          </CustomText>
        )}
      </View>
      {isRightIcon && (
        <FontAwesome5 name="calendar-alt" color={'white'} size={20} />
      )}
    </View>
  );
}
export default SubHeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    width: width,
    marginTop: moderateScale(20, 0.3),
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
