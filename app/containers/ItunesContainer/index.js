/**
 *
 * ItunesContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import makeSelectItunesContainer from './selectors';
import saga from './saga';
import { debounce } from 'lodash';

export function ItunesContainer() {
  const handleOnChange = (ituneName) => {
    // fetch itune details
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <div>
      <input onChange={(e) => debouncedHandleOnChange(e.target.value)} type="text" />
    </div>
  );
}

// ItunesContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  itunesContainer: makeSelectItunesContainer()
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch
//   };
// }

const withConnect = connect(mapStateToProps);

export default compose(injectIntl, withConnect, injectSaga({ key: 'itunesContainer', saga }))(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
