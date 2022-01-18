import React, { useRef } from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card, Tooltip, Button } from 'antd';
import styled from 'styled-components';
import { T } from '../T/index';
import { LinkOutlined } from '@ant-design/icons';

const CustomCard = styled(Card)`
  && {
    max-width: 350px;
    margin: 1rem 0;
  }
`;

const CustomAudio = styled.audio`
  margin: 1rem 0;
`;

const ItunesCard = ({ onClickAction, itune }) => {
  const audioRef = useRef();

  // const { artistName, currency, collectionName, collectionPrice, country } = itune;
  return (
    <CustomCard
      data-testid="itune-card"
      hoverable
      title={itune?.trackName}
      actions={[
        <Tooltip key="artistViewUrl" title="View Artist">
          <Button type="link" target="_blank" href={itune?.artistViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>,
        <Tooltip key="trackViewUrl" title="View Track">
          <Button type="link" target="_blank" href={itune?.trackViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>,
        <Tooltip key="collectionViewUrl" title="View Collection">
          <Button type="link" target="_blank" href={itune?.collectionViewUrl} icon={<LinkOutlined />}></Button>
        </Tooltip>
      ]}
    >
      <T id="artist_name" values={{ artistName: itune?.artistName }} />
      <T id="collection_price" values={{ collectionPrice: itune?.collectionPrice, currency: itune?.currency }} />
      <T id="country" values={{ country: itune?.country }} />
      <T id="collection_name" values={{ collectionName: itune?.collectionName }} />
      <CustomAudio controls onPlay={(e) => onClickAction(e, audioRef)} ref={audioRef}>
        <source src={itune?.previewUrl} type="audio/mpeg" />
      </CustomAudio>
    </CustomCard>
  );
};

ItunesCard.propTypes = {
  onClickAction: PropTypes.func,
  currTrack: PropTypes.object,
  itune: PropTypes.object
};

export default ItunesCard;
