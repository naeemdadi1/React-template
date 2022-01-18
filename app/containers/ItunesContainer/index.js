/**
 *
 * ItunesContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Input, Skeleton } from 'antd';
import makeSelectItunesContainer, { selectItuneName, selectItunesData, selectItunesError } from './selectors';
import saga from './saga';
import { itunesContainerCreators } from './reducer';
import { debounce, get, isEmpty } from 'lodash';
import styled from 'styled-components';
import ItunesCard from '@app/components/ItunesCard/index';

const { Search } = Input;

const FlexContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Container = styled.div`
  && {
    max-width: 75rem;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
  }
`;

export function ItunesContainer({ dispatchItunesData, dispatchClearItunesData, itunesData, itunesError, ituneName }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(itunesData, 'items', null) || itunesError;
    if (loaded) {
      setLoading(false);
    }
  }, [itunesData]);

  //eslint-disable-next-line
  console.log(itunesData, loading);

  useEffect(() => {
    if (ituneName && !itunesData?.results?.length) {
      dispatchItunesData(ituneName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (ituneName) => {
    if (!isEmpty(ituneName)) {
      dispatchItunesData(ituneName);
      setLoading(true);
    } else {
      dispatchClearItunesData();
    }
  };

  const [currTrack, setCurrTrack] = useState();

  const onClickAction = (e, audioRef) => {
    if (!isEmpty(currTrack)) {
      if (currTrack === audioRef?.current) {
        return;
      }
      currTrack.pause();
    }
    setCurrTrack(audioRef?.current);
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <Container>
      <Search
        data-testid="search-bar"
        defaultValue={ituneName}
        onChange={(e) => debouncedHandleOnChange(e.target.value)}
        onSearch={(searchTxt) => debouncedHandleOnChange(searchTxt)}
        type="text"
      />
      <Skeleton loading={loading} active>
        <FlexContainer>
          {itunesData?.results?.map((itune, index) => (
            <ItunesCard onClickAction={onClickAction} itune={itune} key={index} />
          ))}
        </FlexContainer>
      </Skeleton>
    </Container>
  );
}

ItunesContainer.propTypes = {
  dispatchClearItunesData: PropTypes.func,
  dispatchItunesData: PropTypes.func,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  itunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  ituneName: PropTypes.string,
  itunesError: PropTypes.string,
  intl: PropTypes.object
};

ItunesContainer.defaultProps = {
  itunesData: {},
  itunesError: null
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: makeSelectItunesContainer(),
  itunesData: selectItunesData(),
  itunesError: selectItunesError(),
  ituneName: selectItuneName()
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
