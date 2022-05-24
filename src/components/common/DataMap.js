import React from 'react';
import {View, Dimensions} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomText from '@components/common/CustomText';
import HistoryDetailsBox from '@components/common/HistoryDetailsBox';
import DetailsBox from './DetailsBox';
import {useSelector} from 'react-redux';

const height = Dimensions.get('window').height;

function DataMap(props) {
  const {data, label, tag} = props;

  const user = useSelector(state => state.user);
  return (
    <View style={{paddingBottom: moderateScale(70, 0.3)}}>
      {data && (data?.length === 0 || data === undefined) ? (
        <View style={styles.errorLayout}>
          <CustomText
            variant={'body3'}
            font={'italic'}
            gutterTop={moderateScale(2, 0.3)}
            gutterBottom={0}
            color={'gray'}
            align={'center'}
            transform={'none'}>
            No class present
          </CustomText>
        </View>
      ) : (
        data &&
        data?.length > 0 &&
        data !== undefined &&
        data?.map((item, index) => {
          const idPresent =
            item &&
            (item?.trainee?.some(x => x.includes(user?.user?._id)) ||
              item?.penalty?.some(x => x.includes(user?.user?._id)) ||
              item?.waitingList?.some(x => x.includes(user?.user?._id)));

          let classType = item?.catType?.name === 'cycle' ? true : false;
          return (
            <View key={index}>
              {label ? (
                <HistoryDetailsBox
                  label={label}
                  historyData={item}
                  {...props}
                />
              ) : (
                <DetailsBox
                  classData={item}
                  key={index}
                  {...props}
                  idPresent={idPresent}
                  classType={classType}
                />
              )}
            </View>
          );
        })
      )}
    </View>
  );
}

export default DataMap;

const styles = ScaledSheet.create({
  errorLayout: {
    height: height * 0.6,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
