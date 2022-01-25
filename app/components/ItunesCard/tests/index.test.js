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

describe('<ItunesCard />', () => {
  let handlePlaying;

  beforeEach(() => {
    itune, (handlePlaying = jest.fn());
    jest.useFakeTimers();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesCard itune={itune} handlePlaying={handlePlaying} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ItunesCard itune={itune} handlePlaying={handlePlaying} />);
    expect(getAllByTestId('itune-card').length).toBe(1);
  });

  it('should play/pause when handleClick is triggered', () => {
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});

    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} handlePlaying={handlePlaying} />);

    fireEvent.click(getByTestId('play-event'));
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(pauseSpy).toHaveBeenCalledTimes(0);

    fireEvent.click(getByTestId('pause-event'));
    expect(pauseSpy).toHaveBeenCalledTimes(1);
  });

  it('should render progressbar on play song', () => {
    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} handlePlaying={handlePlaying} />);
    fireEvent.click(getByTestId('play-event'));
    expect(getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('should call handle play with audioRef', () => {
    jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});

    const currentTime = 4.0;
    const duration = 30.0;
    const percent = (currentTime / duration) * 100;
    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} handlePlaying={handlePlaying} />);

    fireEvent.click(getByTestId('play-event'));

    const audio = getByTestId('audio-elem');
    audio.currentTime = currentTime;
    Object.defineProperty(audio, 'duration', {
      value: duration,
      Writable: true
    });
    expect(handlePlaying).toBeCalledWith(expect.objectContaining(audio));

    jest.runOnlyPendingTimers();

    expect(getByTestId('itune-card').querySelector('.ant-progress-success-bg')).toHaveStyle(`width: ${percent}%`);
  });
});
