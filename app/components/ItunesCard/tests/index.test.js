/**
 *
 * Tests for ItunesCard
 *
 */

import { renderWithIntl } from '@app/utils/testUtils';
import React from 'react';
import ItunesCard from '../index';
import { fireEvent } from '@testing-library/dom';
import { itune } from './mockData';

describe('<ItunesCard />', () => {
  let onClickAction, ituneName;

  beforeEach(() => {
    itune, (onClickAction = jest.fn());
    ituneName = 'adele';
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <ItunesCard itune={itune} ituneName={ituneName} onClickAction={onClickAction} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(
      <ItunesCard itune={itune} ituneName={ituneName} onClickAction={onClickAction} />
    );
    expect(getAllByTestId('itune-card').length).toBe(1);
  });

  it('should trigger the onClickAction on play button click', () => {
    const { getByTestId } = renderWithIntl(
      <ItunesCard itune={itune} ituneName={ituneName} onClickAction={onClickAction} />
    );
    fireEvent.play(getByTestId('play_event'));
    expect(onClickAction).toBeCalled();
  });

  it('should render ituneName if trackName is not there', () => {
    itune.trackName = null;
    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} ituneName={ituneName} />);
    const titleElem = getByTestId('itune-card');
    expect(titleElem).toHaveTextContent(ituneName);
  });
});
