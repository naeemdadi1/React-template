/**
 *
 * Tests for ItuneDetailContainer
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { ItuneDetailContainerTest as ItuneDetailContainer, mapDispatchToProps } from '../index';
import { itunesContainerTypes } from '../../reducer';

describe('<ItuneDetailContainer /> container tests', () => {
  let submitSpy, id;

  beforeEach(() => {
    id = 1544494392;
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItuneDetailContainer dispatchItune={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchItune on mounting with trackId', async () => {
    renderProvider(<ItuneDetailContainer dispatchItune={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchItunesSearchSpy = jest.fn();
    const actions = {
      dispatchItune: { id, type: itunesContainerTypes.REQUEST_GET_ITUNE },
      dispatchClearItuneDetail: { type: itunesContainerTypes.CLEAR_ITUNE_DETAILS }
    };

    const props = mapDispatchToProps(dispatchItunesSearchSpy);
    props.dispatchItune(id);
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchItune);

    await timeout(500);
    props.dispatchClearItuneDetail();
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchClearItuneDetail);
  });
});
