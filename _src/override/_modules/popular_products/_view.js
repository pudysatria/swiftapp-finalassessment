import React from 'react';
import _ from 'lodash';
import {View, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import ProductItem from '@app/components/_ProductItem';
import RenderIf from '@app/components/RenderIf';
import {FlatList} from 'react-native';

import AppBar from '@app/components/AppBar';
import styles from '@app/_modules/auth_signin/styles';
/**
 * ---------------------------------------------------- *
 * @component AuthSigningView
 * @param {Object} Views.propTypes - defined using PropTypes
 * @summary View Component for Sign In
 * @returns Components
 * ---------------------------------------------------- *
 */

const Views = ({t, prod, loading, onNavigateToProductDetail}) => {
  const theme = useTheme();
  const {background} = _.get(theme, 'colors');
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
      <AppBar useBack title="Popular Products" />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <RenderIf condition={!loading}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: 20,
            }}>
            <Text style={{fontSize: 20}}>Popular Products</Text>
            <FlatList
              data={prod[0]?.products?.items}
              keyExtractor={item => item.name}
              numColumns={2}
              renderItem={({item}) => {
                const getFinalPrice =
                  item?.price_range?.maximum_price?.final_price;
                console.log(item.image.url);
                return (
                  <ProductItem
                    onPress={() => onNavigateToProductDetail(item.url_key)}
                    key={item.url_key}
                    name={item?.name}
                    keyImage={item.url_key}
                    image="https://swift-sprint.testingnow.me/media/catalog/product/placeholder/default/bg.png"
                    currency={getFinalPrice.currency}
                    price={getFinalPrice.value}
                  />
                );
              }}
            />
          </View>
        </RenderIf>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withProfiler(Views, {name: 'PopularProductsView'});
