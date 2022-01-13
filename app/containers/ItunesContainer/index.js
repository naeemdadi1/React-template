/**
 *
 * ItunesContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import makeSelectItunesContainer from './selectors';
import saga from './saga';

export function ItunesContainer() {
  return (
    <div>
      <T id={'ItunesContainer'} />
    </div>
  );
}

ItunesContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  itunesContainer: makeSelectItunesContainer()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'itunesContainer', saga }))(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
