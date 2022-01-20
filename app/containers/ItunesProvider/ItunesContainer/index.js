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
import { debounce, get, isEmpty } from 'lodash';
import styled from 'styled-components';
import saga from '../saga';
import ItunesCard from '@app/components/ItunesCard/index';
import { itunesContainerCreators } from '../reducer';
import { selectItuneName, selectItunesData, selectItunesError } from '../selectors';
import For from '@app/components/For/index';
import If from '@app/components/If/index';
import { T } from '@app/components/T/index';
import * as colors from '@app/themes/colors';

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
    color: ${colors.error};
  }
`;

export function ItunesContainer({ dispatchItunesData, dispatchClearItunesData, itunesData, itunesError, ituneName }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(itunesData, 'results', itunesError);
    if (loaded) {
      setLoading(false);
    }
  }, [itunesData, itunesError]);

  useEffect(() => {
    if (ituneName && !itunesData?.results?.length) {
      dispatchItunesData(ituneName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (ituneName) => {
    if (ituneName) {
      dispatchItunesData(ituneName);
      setLoading(true);
    } else {
      dispatchClearItunesData();
    }
  };

  const [currTrack, setCurrTrack] = useState();

  const onClickAction = (e, audioRef) => {
    if (!isEmpty(currTrack) && currTrack !== audioRef?.current) {
      currTrack.pause();
    }
    setCurrTrack(audioRef?.current);
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderItunesData = () => (
    <Skeleton loading={loading} active>
      <For
        of={itunesData?.results}
        ParentComponent={FlexContainer}
        renderItem={(item, index) => (
          <ItunesCard key={index} itune={item} ituneName={ituneName} onClickAction={onClickAction} />
        )}
      />
    </Skeleton>
  );

  const renderErrorState = () =>
    !loading &&
    itunesError && (
      <Container>
        <If condition={itunesError}>
          <T data-testid="itunes-error-message" text={itunesError} />
        </If>
      </Container>
    );
  return (
    <Container>
      <Search
        data-testid="search-bar"
        defaultValue={ituneName}
        onChange={(e) => debouncedHandleOnChange(e.target.value)}
        onSearch={(searchTxt) => debouncedHandleOnChange(searchTxt)}
        type="text"
      />
      {renderItunesData()}
      {renderErrorState()}
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
    results: PropTypes.arrayOf(
      PropTypes.shape({
        artistName: PropTypes.string,
        collectionName: PropTypes.string,
        trackName: PropTypes.string,
        artistViewUrl: PropTypes.string,
        collectionViewUrl: PropTypes.string,
        trackViewUrl: PropTypes.string,
        previewUrl: PropTypes.string,
        collectionPrice: PropTypes.number,
        trackPrice: PropTypes.number,
        country: PropTypes.string,
        currency: PropTypes.string,
        length: PropTypes.number
      })
    )
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
