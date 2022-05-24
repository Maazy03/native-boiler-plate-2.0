import CustomButton from '@components/common/CustomButton';
import CustomText from '@components/common/CustomText';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {URL} from '@config/apiUrl';
import {STRIPE_KEY} from '@env';

import {
  StripeProvider,
  CardField,
  useStripe,
} from '@stripe/stripe-react-native';
import Toast from '@components/utils/Toast';
import {Post} from '@axios/AxiosInterceptorFunction';

function AddCardsModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {createPaymentMethod} = useStripe();
  const addCardUrl = URL('users/attach-payment-methods');

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const addCard = async () => {
    setIsLoading(true);
    const responseCard = await createPaymentMethod({type: 'Card'});
    if (responseCard?.error) {
      Toast.show({
        title: 'Oops!',
        message: responseCard?.error?.message,
        type: 'danger',
      });
      setIsLoading(false);
    } else {
      const id = responseCard?.paymentMethod?.id;
      const data = {
        pmId: id,
      };
      const response = await Post(addCardUrl, data);
      Toast.show({
        title: 'Hurrah!',
        message: 'Card Added Succesfully',
        type: 'success',
      });
      setIsBlur(false);
      props.refreshList();
      setIsLoading(false);
    }
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
              Card
            </CustomText>
            <CustomText
              variant={'h6'}
              font={'light'}
              gutterTop={5}
              gutterBottom={10}
              color={'white'}
              align={'left'}
              transform={'none'}>
              Enter card details
            </CustomText>

            <StripeProvider
              publishableKey={STRIPE_KEY}
              merchantIdentifier="merchant.identifier">
              <CardField
                postalCodeEnabled={false}
                autofocus
                placeholder={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: 'black',
                  placeholderColor: '#888888',
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 30,
                }}
              />
            </StripeProvider>

            <CustomButton
              value="Done"
              bgColor={'#888888'}
              width={'70%'}
              size={'xmd'}
              color={'white'}
              borderRadius={100}
              gutterTop={20}
              fontSize={20}
              variant={'body3'}
              font={'light'}
              loaderColor={'white'}
              loader={isLoading}
              onPress={addCard}
            />
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

export default AddCardsModal;
