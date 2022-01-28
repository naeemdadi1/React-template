import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { itunesContainerCreators } from '../reducer';
import { injectSaga } from 'redux-injectors';
import saga from '../saga';
import { selectItuneDetail, selectItuneDetailError } from '../selectors';

const ItuneDetailContainer = ({ dispatchItune, ituneDetail, ituneDetailError, dispatchClearItuneDetail }) => {
  const { id } = useParams();

  useEffect(() => {
    dispatchItune(id);
  }, []);

  return <div>ItuneDetailContainer</div>;
};

ItuneDetailContainer.propTypes = {
  dispatchItune: PropTypes.func,
  ituneDetail: PropTypes.object,
  ituneDetailError: PropTypes.string,
  dispatchClearItuneDetail: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  ituneDetail: selectItuneDetail(),
  ituneDetailError: selectItuneDetailError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItune, clearItuneDetails } = itunesContainerCreators;
  return {
    dispatchItune: (id) => dispatch(requestGetItune(id)),
    dispatchClearItuneDetail: () => dispatch(clearItuneDetails())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  memo,
  withConnect,
  injectSaga({ key: 'itunesContainer', saga })
)(ItuneDetailContainer);

export const ItuneDetailContainerTest = compose(injectIntl)(ItuneDetailContainer);
