import { BCheckedIcon, images } from '../../../../assets/images';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { WalletItemStyle } from '../../types';
import useMergeStyles from './styles';
import { Wallet } from '../../../../types';
import { BankContext } from '../../../../contexts/bank-context';
import { ThemeContext } from '../../../../contexts/them-context';
import { BImage } from '../../../../theme';

export type WalletItemProps = {
  wallet: Wallet;
  onItemPressed?: (wallet: Wallet) => void;
  style?: WalletItemStyle;
  tickIcon?: ReactNode;
  primaryLabel?: string;
  moreIcon?: ReactNode;
  formatCurrency: (amount: number, code: string) => string;
  isShowSwitch: boolean;
  recommandBanner?: ReactNode;
  bannerYOffset?: number;
};

const WalletItemComponent = (props: WalletItemProps) => {
  const {
    wallet,
    style,
    onItemPressed,
    formatCurrency,
    tickIcon,
    primaryLabel,
    moreIcon,
    isShowSwitch,
    recommandBanner,
    bannerYOffset,
  } = props;
  const { bankImages } = useContext(BankContext);
  const { theme } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  const value = new Animated.Value(0);
  const [playAnimation, setPlayAnimation] = useState(true);
  const switchButton = value.interpolate({
    inputRange: [0, 1],
    outputRange: [-47, -8],
  });

  useEffect(() => {
    if (isShowSwitch) {
      Animated.timing(value, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setPlayAnimation(false));
    }
  }, [isShowSwitch]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.containerStyle}
        onPress={() => onItemPressed?.(wallet)}
      >
        <View style={styles.imageContainerStyle}>
          <BImage
            resizeMode="contain"
            style={styles.imageStyle}
            fallbackImage={images.bank}
            source={{ uri: bankImages[wallet.bankAccount.bankCode] }}
          />
        </View>
        <View style={styles.leftContainerStyle}>
          <Text style={styles.accountNameTextStyle}>{wallet.walletName}</Text>
          <Text style={styles.accountNumberTextStyle}>
            {`${wallet.bankAccount?.bankBranchId ?? ''} ${wallet.bankAccount.accountNumber}`.trim()}
          </Text>
        </View>
        <View style={styles.rightContainerStyle}>
          <Text style={styles.amountTextStyle}>
            {formatCurrency(wallet.currentBalance, wallet.currencyCode)}
          </Text>
          {wallet.isDefaultWallet && (
            <View style={styles.primaryContainerStyle}>
              {tickIcon ?? <BCheckedIcon size={12} color={theme.primaryColor} />}
              <Text style={styles.primaryTextStyle}>{primaryLabel ?? 'Primary'}</Text>
            </View>
          )}
        </View>
        {moreIcon}
      </TouchableOpacity>
      <Animated.View
        style={{
          transform: [{ translateY: playAnimation ? switchButton : bannerYOffset ?? -8 }],
        }}
      >
        {isShowSwitch ? recommandBanner : <View />}
      </Animated.View>
    </View>
  );
};

export default React.memo(WalletItemComponent);
