/**
 *
 * Tests for ItunesCard
 *
 */

import { renderWithIntl, timeout } from '@utils/testUtils';
import React from 'react';
import ItunesCard from '../index';
import { fireEvent } from '@testing-library/dom';
import { itune } from './mockData';

describe('<ItunesCard />', () => {
  let onClickAction;

  beforeEach(() => {
    itune, (onClickAction = jest.fn());
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesCard itune={itune} onClickAction={onClickAction} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ItunesCard itune={itune} onClickAction={onClickAction} />);
    expect(getAllByTestId('itune-card').length).toBe(1);
  });

  it('should play when setPlaying is true', async () => {
    const playEvt = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});

    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} onClickAction={onClickAction} />);

    fireEvent.click(getByTestId('play_event'));
    await timeout(1000);
    expect(playEvt).toHaveBeenCalledTimes(1);
  });
});
