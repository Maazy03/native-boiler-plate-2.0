import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CustomText from '@components/common/CustomText';
import {useSelector} from 'react-redux';
import BiCycleDetailsBox from './BiCycleDetailsBox';

const height = Dimensions.get('window').height;

function DataMapSports(props) {
  const {data, label} = props;
  const user = useSelector(state => state.user);

  return (
    <View style={{paddingBottom: 70}}>
      {data && data?.length === 0 ? (
        <View style={styles.errorLayout}>
          <CustomText
            variant={'body2'}
            font={'italic'}
            gutterTop={2}
            gutterBottom={0}
            color={'white'}
            align={'center'}
            transform={'none'}>
            No class present
          </CustomText>
        </View>
      ) : (
        data &&
        data?.length &&
        data?.map((item, index) => {
          const idPresent =
            item && item?.trainee?.some(x => x.includes(user?.user?._id));
          return (
            <View key={index}>
              <BiCycleDetailsBox
                label={label}
                classData={item}
                {...props}
                idPresent={idPresent}
              />
            </View>
          );
        })
      )}
    </View>
  );
}

export default DataMapSports;

const styles = StyleSheet.create({
  errorLayout: {
    height: height * 0.6,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
