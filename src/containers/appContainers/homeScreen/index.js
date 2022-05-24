import React, {useState} from 'react';
import {ScrollView, RefreshControl, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import CustomText from '@components/common/CustomText';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import R from '@components/utils/R';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function App(props) {
  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };
  const user = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{...R.styles.container}}
        contentContainerStyle={{
          ...R.styles.centeredView,
          paddingBottom: Platform.OS === 'ios' ? 100 : 40,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={'#888888'}
            colors={['black', 'white']}
            tintColor={'#888888'}
          />
        }>
        <CustomText
          variant={'h4'}
          font={'mediumItalic'}
          gutterTop={10}
          color={R.color.mainColor}
          style={R.styles.centeredView}
          align={'left'}
          transform={'capitalize'}>
          Boiler Plate 1.0 by
        </CustomText>
        <CustomText
          variant={'h4'}
          font={'mediumItalic'}
          gutterTop={10}
          color={R.color.white}
          align={'left'}
          transform={'capitalize'}>
          Muhammad Maaz
        </CustomText>
      </ScrollView>
    </ScreenBoiler>
  );
}
