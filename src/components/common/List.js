import React from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomText from '@components/common/CustomText';
import HistoryDetailsBox from '@components/common/HistoryDetailsBox';
import Loader from './Loader';

const height = Dimensions.get('window').height;

function List(props) {
  const {data, label, loadMoreData, footerLoader} = props;

  let reverseData = data.slice().reverse();

  const ItemView = (item, index) => {
    return (
      <View key={index}>
        <HistoryDetailsBox label={label} historyData={item?.item} {...props} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reverseData}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 20 : 100,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0}
        ListFooterComponent={
          footerLoader ? (
            <View style={{marginVertical: 30}}>
              <Loader />
            </View>
          ) : (
            <View />
          )
        }
        ListEmptyComponent={() => {
          return (
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
          );
        }}
      />
    </View>
  );
}

export default List;

const styles = ScaledSheet.create({
  errorLayout: {
    height: height * 0.6,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    width: '100%',
    // height: height,
    flex: 1,
    paddingHorizontal: moderateScale(20, 0.3),
    backgroundColor: '#242424',
    marginTop: moderateScale(10, 0.3),
  },
});
