/**
 *
 * Tests for ItunesCard
 *
 */

import { renderWithIntl } from '@app/utils/testUtils';
import React from 'react';
import ItunesCard from '../index';
import { fireEvent } from '@testing-library/dom';

describe('<ItunesCard />', () => {
  let itune, onClickAction;

  beforeEach(() => {
    itune = {
      artistName: 'Blake Shelton',
      collectionName: 'Based On a True Story... (Deluxe Version)',
      trackName: "Doin' What She Likes",
      artistViewUrl: 'https://music.apple.com/us/artist/blake-shelton/189204?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/album/doin-what-she-likes/606057263?i=606057326&uo=4',
      trackViewUrl: 'https://music.apple.com/us/album/doin-what-she-likes/606057263?i=606057326&uo=4',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/98/70/8c/98708cde-2365-38e9-7eab-76786d3ef1a9/mzaf_12146965378941562534.plus.aac.p.m4a',
      collectionPrice: 10.99,
      trackPrice: 1.29,
      country: 'USA',
      currency: 'USD'
    };
    onClickAction = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesCard itune={itune} onClickAction={onClickAction} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItunesCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ItunesCard itune={itune} onClickAction={onClickAction} />);
    expect(getAllByTestId('itune-card').length).toBe(1);
  });

  it('should play the song on play button click', () => {
    const { getByTestId } = renderWithIntl(<ItunesCard itune={itune} onClickAction={onClickAction} />);
    fireEvent.play(getByTestId('play_event'));
    expect(onClickAction).toBeCalled();
  });
});
