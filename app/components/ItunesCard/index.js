import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, Tooltip, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { truncate } from 'lodash';
import styled from 'styled-components';
import { T } from '@components/T';
import If from '../If/index';
import history from '@app/utils/history';
// import { Link } from 'react-router-dom';

const CustomCard = styled(Card)`
  && {
    max-width: 22rem;
    margin: 1rem 0;
  }
`;

const CustomAudio = styled.audio`
  margin: 1rem 0;
`;

const ItunesCard = ({ onClickAction, itune, ituneName }) => {
  const audioRef = useRef();

  const {
    trackName,
    artistViewUrl,
    trackViewUrl,
    collectionName,
    collectionPrice,
    collectionViewUrl,
    artistName,
    previewUrl,
    country,
    currency,
    trackId
  } = itune;

  return (
    <CustomCard
      onClick={() => trackId && history.push(`/track/${trackId}`)}
      data-testid="itune-card"
      hoverable
      title={trackName ? trackName : ituneName}
      actions={[
        <Tooltip key="artistViewUrl" title="View Artist">
          <Button type="link" target="_blank" href={artistViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>,
        <Tooltip key="trackViewUrl" title="View Track">
          <Button type="link" target="_blank" href={trackViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>,
        <Tooltip key="collectionViewUrl" title="View Collection">
          <Button type="link" target="_blank" href={collectionViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>
      ]}
    >
      <If condition={artistName}>
        <T id="artist_name" values={{ artistName }} />
      </If>
      <If condition={(collectionPrice, currency)}>
        <T id="collection_price" values={{ collectionPrice, currency }} />
      </If>
      <If condition={country}>
        <T id="country" values={{ country }} />
      </If>
      <If condition={collectionName}>
        <T id="collection_name" values={{ collectionName: truncate(collectionName, { length: 20 }) }} />
      </If>
      <CustomAudio controls data-testid="play_event" onPlay={(e) => onClickAction(e, audioRef)} ref={audioRef}>
        <source src={previewUrl} type="audio/mpeg" />
      </CustomAudio>
    </CustomCard>
  );
};

ItunesCard.propTypes = {
  onClickAction: PropTypes.func,
  currTrack: PropTypes.object,
  itune: PropTypes.object.isRequired,
  ituneName: PropTypes.string
};

export default ItunesCard;
