import React, { memo } from 'react';
import { compose } from '@app/../../../Library/Caches/typescript/4.5/node_modules/redux/index';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { itunesContainerCreators } from '../reducer';
import { injectSaga } from 'redux-injectors';
import saga from '../saga';
import { selectId, selectItuneDetail, selectItuneDetailError } from '../selectors';

const ItuneDetailContainer = ({ dispatchItuneDetail, id, ituneDetail, ituneDetailError }) => {
  return <div>ItuneDetailContainer</div>;
};

ItuneDetailContainer.propTypes = {
  dispatchItuneDetail: PropTypes.func,
  id: PropTypes.number,
  ituneDetail: PropTypes.object,
  ituneDetailError: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  id: selectId(),
  ituneDetail: selectItuneDetail(),
  ituneDetailError: selectItuneDetailError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItuneDetail } = itunesContainerCreators;
  return {
    dispatchItuneDetail: (id) => dispatch(requestGetItuneDetail(id))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  memo,
  withConnect,
  injectSaga({ key: 'ituneDetailContainer', saga })
)(ItuneDetailContainer);

export const ItuneDetailContainerTest = compose(injectIntl)(ItuneDetailContainer);
