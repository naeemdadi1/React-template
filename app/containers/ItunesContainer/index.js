/**
 *
 * ItunesContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Input } from 'antd';
import makeSelectItunesContainer from './selectors';
import saga from './saga';
import { itunesContainerCreators } from './reducer';
import { debounce, isEmpty } from 'lodash';

const { Search } = Input;

export function ItunesContainer({ dispatchItunesData, dispatchClearItunesData }) {
  const handleOnChange = (ituneName) => {
    if (!isEmpty(ituneName)) {
      dispatchItunesData(ituneName);
    } else {
      dispatchClearItunesData();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <div>
      <Search data-testid="search-bar" onChange={(e) => debouncedHandleOnChange(e.target.value)} type="text" />
    </div>
  );
}

ItunesContainer.propTypes = {
  dispatchClearItunesData: PropTypes.func,
  dispatchItunesData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: makeSelectItunesContainer()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItunesData, clearItunesData } = itunesContainerCreators;
  return {
    dispatchItunesData: (iName) => dispatch(requestGetItunesData(iName)),
    dispatchClearItunesData: () => dispatch(clearItunesData())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, memo, withConnect, injectSaga({ key: 'itunesContainer', saga }))(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
