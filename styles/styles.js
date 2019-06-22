import { StyleSheet } from 'react-native';
import {
  sanFranciscoSpacing,
  iOSColors,
  sanFranciscoWeights
} from 'react-native-typography';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2'
  },
  size: {
    ...sanFranciscoWeights.heavy,
    fontSize: 20,
    letterSpacing: sanFranciscoSpacing(24)
  },
  smallSize: {
    ...sanFranciscoWeights.heavy,
    fontSize: 16,
    letterSpacing: sanFranciscoSpacing(24)
  },
  mediumSize: {
    ...sanFranciscoWeights.heavy,
    fontSize: 20,
    letterSpacing: sanFranciscoSpacing(24)
  },
  green: { color: iOSColors.green },
  red: { color: iOSColors.red },
  yellow: { color: iOSColors.yellow },
  black: { color: iOSColors.black },
  redBorder: {
    borderRadius: 3,
    borderWidth: 10,
    borderColor: '#5b0654'
  },
  card: {
    marginTop: '10%'
  },
  error: {
    color: 'red',
    fontSize: 20
  },
  webview: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    marginTop: '5%'
  },
  nothing: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
