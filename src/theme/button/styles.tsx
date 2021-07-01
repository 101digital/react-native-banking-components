import { BankingButtonStyleProps } from '../types';

export const defaultButtonStyle: BankingButtonStyleProps = {
  primaryContainer: {
    height: 42,
    backgroundColor: 'blue',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  secondaryContainer: {
    height: 42,
    backgroundColor: '#f4f8fb',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingContainer: {
    marginHorizontal: 5,
  },
  labelStyle: {
    fontSize: 16,
    color: 'white',
  },
  secondLabelStyle: {
    fontSize: 16,
  },
  disableOpacity: 0.6,
  indicatorColor: 'white',
};
