import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import {Storage} from '@app/helpers/Storage';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';
import {USER_CUSTOMER, USER_TYPE, BEARER, EMAIL} from '@app/helpers/Constants';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import Views from '@root/_src/override/_modules/popular_products/_view';
import { GET_BEST_SELLER_PRODUCTS } from './services/schema';

const PopularController = props => {
  if (!modules.auth_signin.enable) {
    return null;
  }

  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const {t} = useTranslation();
  const {data, loading} = customUseQuery(GET_BEST_SELLER_PRODUCTS);

  const products= data?.categoryList || [];


  /**
   * ---------------------------------------------------- *
   * @function onNavigateSignup
   * @summary navigation to sign up page
   * ---------------------------------------------------- *
   */
   const onNavigateToProductDetail = productUrlKey => {
    navigateTo(modules.product_detail.enable, modules.product_detail.name, {
      productUrlKey,
    });
  };

  /**
   * ---------------------------------------------------- *
   * @constant {controllerProps}
   * @summary set controller props
   * ---------------------------------------------------- *
   */
  const controllerProps = {
    t,
  };

  return <Views loading={loading} prod={products} onNavigateToProductDetail={onNavigateToProductDetail} {...props} {...controllerProps} />;
};

export default withProfiler(PopularController, {
  name: 'PopularController',
});
