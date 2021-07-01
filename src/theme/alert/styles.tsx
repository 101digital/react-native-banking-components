import { BankingAlertModalStyleProps } from '../types';

export const defaultAlertStyle: BankingAlertModalStyleProps = {
  horizontalSpace: 20,
  backdropOpacity: 0.5,
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  containerStyle: {
    width: '85%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  headerStyle: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyStyle: {},
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  titleStyle: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 15,
    color: 'black',
  },
  leftIconStyle: {
    paddingVertical: 20,
    paddingRight: 8,
  },
  closeButtonStyle: {
    paddingVertical: 15,
  },
  messageStyle: {
    fontSize: 15,
    color: 'black',
  },
};
