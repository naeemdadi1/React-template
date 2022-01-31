/**
 *
 * Tests for ItunesContainer
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesContainerTest as ItunesContainer, mapDispatchToProps } from '../index';
import { itunesContainerTypes } from '../../reducer';
import { mockedItuneData, mockedItunesData, resultCount } from './mockData';
import { translate } from '@components/IntlGlobalProvider/index';

describe('<ItunesContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer dispatchItunesData={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchItunesData on change and after enter', async () => {
    const ituneName = 'react-template';
    const { getByTestId } = renderProvider(<ItunesContainer dispatchItunesData={submitSpy} />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: { value: ituneName }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(ituneName);

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(ituneName);
  });

  it('should call dispatchClearItunesData on empty change', async () => {
    const getItunesDataSpy = jest.fn();
    const clearItunesDataSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ItunesContainer dispatchClearItunesData={clearItunesDataSpy} dispatchItunesData={getItunesDataSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesDataSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesDataSpy).toBeCalled();
  });

  it('should call dispatchItunesData on submitting the search', async () => {
    const ituneName = 'test';
    const { getByTestId } = renderProvider(<ItunesContainer dispatchItunesData={submitSpy} />);
    fireEvent.keyDown(getByTestId('search-bar'), { keyCode: 13, target: { value: ituneName } });

    await timeout(500);
    expect(submitSpy).toBeCalledWith(ituneName);
  });

  it('should  dispatchItunesData on update on mount if ituneName is already persisted', async () => {
    const ituneName = 'test';
    renderProvider(<ItunesContainer ituneName={ituneName} itunesData={null} dispatchItunesData={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(ituneName);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchItunesSearchSpy = jest.fn();
    const ituneName = 'react-template';
    const actions = {
      dispatchItunesData: { ituneName, type: itunesContainerTypes.REQUEST_GET_ITUNES_DATA },
      dispatchClearItunesData: { type: itunesContainerTypes.CLEAR_ITUNES_DATA }
    };

    const props = mapDispatchToProps(dispatchItunesSearchSpy);
    props.dispatchItunesData(ituneName);
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchItunesData);

    await timeout(500);
    props.dispatchClearItunesData();
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchClearItunesData);
  });

  it('should render the itunes data when search query is resolved and data saved in store', () => {
    const { getByTestId } = renderProvider(
      <ItunesContainer itunesData={mockedItuneData} dispatchItunesData={submitSpy} />
    );
    expect(getByTestId('itune-card')).toBeInTheDocument();
  });

  it('should render error message when search query is not resolved', () => {
    const customError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<ItunesContainer itunesError={customError} />);
    expect(getByTestId('itunes-error-message')).toBeInTheDocument();
    expect(getByTestId('itunes-error-message').textContent).toBe(customError);
  });

  it('should render exact number of ItunesCards as per totalCount in result', () => {
    const { getAllByTestId } = renderProvider(
      <ItunesContainer itunesData={mockedItunesData} dispatchItunesData={submitSpy} />
    );
    expect(getAllByTestId('itune-card').length).toBe(resultCount);
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const ituneName = 'test';
    const { getByTestId, baseElement } = renderProvider(
      <ItunesContainer dispatchItunesData={submitSpy} ituneName={ituneName} />
    );
    fireEvent.change(getByTestId('search-bar'), { target: { value: ituneName } });
    await timeout(500);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });

  it('should check if earlier played track is paused if the new track starts playing', () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
    jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});

    const { getAllByTestId } = renderProvider(
      <ItunesContainer dispatchItunesData={submitSpy} itunesData={mockedItunesData} />
    );

    const audioElems = getAllByTestId('audio-elem');
    const playEvts = getAllByTestId('play-event');
    const pauseEvts = getAllByTestId('pause-event');

    fireEvent.click(playEvts[0]);
    expect(audioElems[0]).not.toHaveAttribute('paused');

    fireEvent.click(playEvts[1]);

    expect(audioElems[0]).toHaveProperty('paused', true);
    expect(audioElems[1]).not.toHaveAttribute('paused');

    fireEvent.click(pauseEvts[1]);
    expect(audioElems[1]).toHaveProperty('paused', true);
  });
});
