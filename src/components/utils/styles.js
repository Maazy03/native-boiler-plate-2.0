import {StyleSheet} from 'react-native';
import unit from './Unit';
import colors from './Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: unit.scale(10),
  },
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
  centeredView: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
});

export default styles;
