/**
 *
 * Tests for ItunesCard
 *
 */

import { renderWithIntl } from '@app/utils/testUtils';
import React from 'react';
import ItunesCard from '../index';

describe('<ItunesCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesCard />);
    expect(baseElement).toMatchSnapshot();
  });
});
