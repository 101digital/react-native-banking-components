import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  EmptyTransactionComponent,
  PageIndicatorComponent,
  TransactionPageComponent,
  WalletCarouselComponent,
} from './components';
import { TransactionComponentProps } from './types';
import useMergeStyles from './styles';
import { WalletContext } from '../../contexts/wallet-context';
import { Wallet } from '../../types';
import { TransactionContext } from '../../contexts/transaction-context';
import { ThemeContext } from 'react-native-theme-component';
import BNoWalletComponent from '../no-wallet';

const TransactionComponent = (props: TransactionComponentProps) => {
  const {
    Root,
    CarouselItem,
    Pagination,
    TransactionPage,
    EmptyTransaction,
    TransactionItem,
    EmptyWallet,
  } = props;
  const { initWallet, formatCurrency } = Root?.props;
  const containerStyle = Root?.style;

  const { carouselItemWidth, carouselWidth } = CarouselItem.props;

  const styles = useMergeStyles(containerStyle);

  // state
  const carouselRef: any = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>(undefined);

  //context data and function
  const { wallets, getAggregatedWallets, isLoadingWallets } = useContext(WalletContext);
  const { transactions, fetchTransactions } = useContext(TransactionContext);
  const aggregatedWallets = getAggregatedWallets();
  const { colors } = useContext(ThemeContext);
  const [_initialWallet, setInitialWallet] = useState(initWallet);

  useEffect(() => {
    setInitialWallet(initWallet);
  }, [Root?.props]);

  useEffect(() => {
    if (_initialWallet && !isEmpty(aggregatedWallets)) {
      const initIndex =
        aggregatedWallets.findIndex((wallet) => wallet.walletId === _initialWallet.walletId) || 0;
      setTimeout(() => {
        changeToIndex(initIndex);
      }, 500);
    }
  }, [aggregatedWallets, _initialWallet]);

  useEffect(() => {
    if (!isEmpty(wallets)) {
      changeToIndex(0);
    }
  }, [wallets]);

  useEffect(() => {
    if (!isEmpty(aggregatedWallets)) {
      let focusWallet = aggregatedWallets[currentIndex];
      const transactionIndex = transactions.findIndex(
        (ts) => ts.walletId === focusWallet?.walletId
      );
      if (focusWallet && transactionIndex === -1) {
        fetchTransactions(focusWallet.walletId, 1);
      }
      setCurrentWallet(focusWallet);
    }
  }, [currentIndex, wallets]);

  const changeToIndex = (index: number) => {
    setCurrentIndex(index);
    carouselRef?.current?.snapToItem(index);
  };

  if (isEmpty(wallets)) {
    if (isLoadingWallets) {
      return (
        <View style={styles.loadingWrap}>
          {Root?.components?.loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
        </View>
      );
    }
    return (
      <BNoWalletComponent
        style={EmptyWallet?.style}
        {...EmptyWallet?.props}
        {...EmptyWallet?.components}
      />
    );
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.carouselWrap}>
        <Carousel
          removeClippedSubviews={false}
          ref={carouselRef}
          data={aggregatedWallets}
          keyExtractor={(item: Wallet) => item.walletId}
          extraData={aggregatedWallets}
          renderItem={({ item }: any) => {
            return (
              <WalletCarouselComponent
                style={CarouselItem.style}
                wallet={item}
                formatCurrency={formatCurrency}
                {...CarouselItem.props}
                {...CarouselItem.components}
              />
            );
          }}
          sliderWidth={carouselWidth}
          itemWidth={carouselItemWidth}
          inactiveSlideScale={1}
          loop={false}
          activeSlideAlignment="start"
          layout="default"
          onSnapToItem={(index: number) => {
            if (_initialWallet) {
              setInitialWallet(undefined);
            }
            setCurrentIndex(index);
          }}
        />
      </View>
      <View style={styles.paginationWrap}>
        {aggregatedWallets.map((_: any, index: number) => (
          <PageIndicatorComponent
            key={index}
            isActive={currentIndex === index}
            style={Pagination?.style}
            {...Pagination?.props}
          />
        ))}
      </View>
      {currentWallet && (
        <TransactionPageComponent
          key={currentWallet.walletId}
          wallet={currentWallet}
          emptyPlaceholder={
            <EmptyTransactionComponent
              style={EmptyTransaction?.style}
              {...EmptyTransaction?.props}
              {...EmptyTransaction?.components}
            />
          }
          formatCurrency={formatCurrency}
          itemStyle={TransactionItem?.style}
          {...TransactionPage?.component}
          {...TransactionPage?.props}
        />
      )}
    </View>
  );
};

export default TransactionComponent;
