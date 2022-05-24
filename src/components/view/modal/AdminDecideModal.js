import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Post} from '@axios/AxiosInterceptorFunction';
import {URL} from '@config/apiUrl';
import CustomText from '@components/common/CustomText';
import Toast from '@components/utils/Toast';
import CustomButton from '@components/common/CustomButton';
import {useSelector} from 'react-redux';

function AdminDecideModal(props) {
  const user = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {navigation} = props;

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const isSub = user?.user?.subscriptionType?.some(item => {
    return item === 'individual';
  });

  const adminDecide = async () => {
    setIsLoading(true);
    const reqData = {
      status: 'unassigned',
      message: 'Hello Trainer',
    };
    const trainerApi = URL(`lead/create-lead`);
    const response = await Post(trainerApi, reqData);
    if (response !== undefined) {
      Toast.show({
        title: 'Hurrah!',
        message: 'Request sent to admin Successfully',
        type: 'success',
      });
      navigation.navigate('HomeScreen');
    }
    setIsLoading(false);
  };

  const navigateToPackages = () => {
    navigation.navigate('IndividualPackages');
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      // visible={true}
      onRequestClose={() => setIsBlur(false)}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <CustomText
              variant={'h2'}
              font={'boldItalic'}
              gutterTop={5}
              gutterBottom={30}
              color={'white'}
              align={'center'}
              transform={'none'}>
              Trainer Assign
            </CustomText>
            <CustomText
              variant={'body2'}
              font={'light'}
              gutterTop={5}
              gutterBottom={30}
              color={'white'}
              align={'center'}
              transform={'none'}>
              Are you sure you want admin to assign a trainer?
            </CustomText>

            {isSub ? (
              <CustomButton
                value="Submit"
                bgColor={'#888888'}
                width={'60%'}
                size={'xmd'}
                color={'white'}
                borderRadius={100}
                gutterTop={20}
                variant={'body3'}
                font={'regular'}
                loaderColor={'black'}
                loader={isLoading}
                onPress={adminDecide}
              />
            ) : (
              <View>
                <CustomText
                  variant={'body3'}
                  font={'italic'}
                  color={'gray'}
                  align={'center'}
                  gutterTop={5}
                  gutterBottom={10}
                  transform={'none'}
                  numberOfLines={2}>
                  Please buy an individual package before selecting trainer
                </CustomText>
                <CustomButton
                  value="Packages"
                  bgColor={'#242424'}
                  width={'50%'}
                  size={'xmd'}
                  height={20}
                  color={'white'}
                  gutterTop={10}
                  borderRadius={100}
                  variant={'body2'}
                  onPress={navigateToPackages}
                />
              </View>
            )}
          </View>
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: '#3B3C40',
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 10,
  },
});

export default AdminDecideModal;
