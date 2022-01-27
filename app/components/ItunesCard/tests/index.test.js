/**
 *
 * Tests for ItunesCard
 *
 */

import { renderWithIntl } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';

import React from 'react';
import ItunesCard from '../index';
import { itune } from './mockData';
import { truncate } from 'lodash';

describe('<ItunesCard />', () => {
  let handleOnActionClick;

  beforeEach(() => {
    itune, (handleOnActionClick = jest.fn());
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesCard itune={itune} handleOnActionClick={handleOnActionClick} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ItunesCard itune={itune} handleOnActionClick={handleOnActionClick} />);
    expect(getAllByTestId('itune-card').length).toBe(1);
  });

  it('should check if the song details are rendered inside the card and progress bar should be in the card', () => {
    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} handleOnActionClick={handleOnActionClick} />);

    expect(getByTestId('itune-card')).toHaveTextContent(itune.trackName);
    expect(getByTestId('artist-name')).toHaveTextContent(itune.artistName);
    expect(getByTestId('collection-price')).toHaveTextContent(itune.collectionPrice && itune.currency);
    expect(getByTestId('country')).toHaveTextContent(itune.country);
    expect(getByTestId('collection-name')).toHaveTextContent(truncate(itune.collectionName, { length: 20 }));
    expect(getByTestId('view-artist').href).toBe(itune.artistViewUrl);
    expect(getByTestId('view-collection').href).toBe(itune.collectionViewUrl);
    expect(getByTestId('view-track').href).toBe(itune.trackViewUrl);
    expect(getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('should play and pause the track based on action click', () => {
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});

    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} handleOnActionClick={handleOnActionClick} />);

    fireEvent.click(getByTestId('play-event'));
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(pauseSpy).toHaveBeenCalledTimes(0);

    fireEvent.click(getByTestId('pause-event'));
    expect(pauseSpy).toHaveBeenCalledTimes(1);
  });

  it('should display progress based on the duration and current time of the song and handleOnActionClick should be  to be called with reference of the audio on play and pause', () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
    jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});

    jest.useFakeTimers();

    const currentTime = 4.0;
    const duration = 30.0;
    const percent = (currentTime / duration) * 100;
    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} handleOnActionClick={handleOnActionClick} />);

    fireEvent.click(getByTestId('play-event'));

    const audio = getByTestId('audio-elem');
    audio.currentTime = currentTime;
    Object.defineProperty(audio, 'duration', {
      value: duration,
      Writable: true
    });

    // Check is audio reference is called with play.
    expect(handleOnActionClick).toBeCalledWith(expect.objectContaining(audio));

    jest.runOnlyPendingTimers();

    // Check if the progress is working
    expect(getByTestId('itune-card').querySelector('.ant-progress-success-bg')).toHaveStyle(`width: ${percent}%`);

    // Check if the audio refence is called with pause.
    fireEvent.click(getByTestId('pause-event'));
    expect(handleOnActionClick).toBeCalledWith(expect.objectContaining(audio));
  });
});
