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
import { itunesContainerTypes } from '../reducer';

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
});
