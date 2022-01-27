import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { Card, Tooltip, Button, Progress } from 'antd';
import { LinkOutlined, UserOutlined, AudioOutlined, PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons';
import { T } from '@components/T';
import If from '@components/If';
import { colors } from '@app/themes';

const CustomCard = styled(Card)`
  && {
    max-width: 22rem;
    margin: 1rem 0;
    position: relative;
  }
`;

const CustomButton = styled(Button)`
  && {
    border: none;
    padding: 0.5rem;
    height: unset;
    margin: 0 auto;
    font-size: 2.5rem;
  }
`;

const ButtonDiv = styled.div`
  text-align: center;
`;

const CustomAudio = styled.audio`
  margin: 1rem 0;
`;

const CustomProgress = styled(Progress)`
  && {
    position: absolute;
    bottom: -0.4rem;
    left: 0;
  }
  && .ant-progress-inner {
    background-color: ${colors.transparent};
  }
`;

const ItunesCard = ({ itune, handleOnActionClick, intl }) => {
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [intervalStore, setIntervalStore] = useState(null);

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

  useEffect(() => {
    clearInterval(intervalStore);
  }, [itune]);

  useEffect(() => {
    return () => {
      clearInterval(intervalStore);
    };
  }, []);

  function calculateProgress() {
    const intervalValue = setInterval(() => {
      const fraction = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(fraction);
    }, 1000);
    setIntervalStore(intervalValue);
  }

  const handlePlaying = (val) => {
    if (val) {
      audioRef.current.play();
      calculateProgress();
    } else {
      audioRef.current.pause();
    }
    handleOnActionClick(val, audioRef.current);
  };

  return (
    <CustomCard
      onClick={() => trackId && history.push(`/track/${trackId}`)}
      data-testid="itune-card"
      hoverable
      title={trackName}
      actions={[
        <If condition={artistViewUrl} key="artistViewUrl">
          <Tooltip title={intl.formatMessage({ id: 'view_artist' })}>
            <Button
              data-testid="view-artist"
              type="link"
              target="_blank"
              href={artistViewUrl}
              icon={<UserOutlined />}
            ></Button>
          </Tooltip>
        </If>,
        <If condition={trackViewUrl} key="trackViewUrl">
          <Tooltip title={intl.formatMessage({ id: 'view_track' })}>
            <Button
              data-testid="view-track"
              type="link"
              target="_blank"
              href={trackViewUrl}
              icon={<AudioOutlined />}
            ></Button>
          </Tooltip>
        </If>,
        <If condition={collectionViewUrl} key="collectionViewUrl">
          <Tooltip title={intl.formatMessage({ id: 'view_collection' })}>
            <Button
              data-testid="view-collection"
              type="link"
              target="_blank"
              href={collectionViewUrl}
              icon={<LinkOutlined />}
            ></Button>
          </Tooltip>
        </If>
      ]}
    >
      <If condition={artistName}>
        <T id="artist_name" data-testid="artist-name" values={{ artistName: truncate(artistName, { length: 20 }) }} />
      </If>
      <If condition={collectionPrice && currency}>
        <T id="collection_price" data-testid="collection-price" values={{ collectionPrice, currency }} />
      </If>
      <If condition={country}>
        <T id="country" values={{ country }} data-testid="country" />
      </If>
      <If condition={collectionName}>
        <T
          id="collection_name"
          data-testid="collection-name"
          values={{ collectionName: truncate(collectionName, { length: 20 }) }}
        />
      </If>
      <ButtonDiv>
        <CustomButton onClick={() => handlePlaying(true)} data-testid="play-event">
          <PlayCircleFilled />
        </CustomButton>
        <CustomButton onClick={() => handlePlaying(false)} data-testid="pause-event">
          <PauseCircleFilled />
        </CustomButton>
      </ButtonDiv>
      <CustomAudio ref={audioRef} src={previewUrl} data-testid="audio-elem" type="audio/mpeg" />
      <CustomProgress data-testid="progress-bar" success={{ percent: progress }} showInfo={false} status="active" />
    </CustomCard>
  );
};

ItunesCard.propTypes = {
  handleOnActionClick: PropTypes.func,
  itune: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    artistViewUrl: PropTypes.string.isRequired,
    collectionViewUrl: PropTypes.string.isRequired,
    trackViewUrl: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    trackPrice: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    length: PropTypes.number
  }).isRequired,
  intl: PropTypes.object
};

export default injectIntl(ItunesCard);
