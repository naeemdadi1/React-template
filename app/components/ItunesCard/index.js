import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import styled from 'styled-components';
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
    top: -0.6rem;
    left: 0;
  }
  && inner {
    background-color: ${colors.transparent};
  }
`;

const ItunesCard = ({ itune, handlePlaying }) => {
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [intervalStore, setIntervalStore] = useState(null);
  const [playing, setPlaying] = useState(false);

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
    currency
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
      if (audioRef.current) {
        const fraction = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(fraction);
      }
    }, 1000);
    setIntervalStore(intervalValue);
  }

  const handleOnActionClick = (val) => {
    setPlaying(val);
    if (val) {
      audioRef.current.play();
      calculateProgress();
      handlePlaying(audioRef.current);
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <CustomCard
      data-testid="itune-card"
      hoverable
      title={trackName}
      actions={[
        <If condition={artistViewUrl} key="artistViewUrl">
          <Tooltip title="View Artist">
            <Button type="link" target="_blank" href={artistViewUrl} icon={<UserOutlined />}></Button>
          </Tooltip>
        </If>,
        <If condition={trackViewUrl} key="trackViewUrl">
          <Tooltip title="View Track">
            <Button type="link" target="_blank" href={trackViewUrl} icon={<AudioOutlined />}></Button>
          </Tooltip>
        </If>,
        <If condition={collectionViewUrl} key="collectionViewUrl">
          <Tooltip title="View Collection">
            <Button type="link" target="_blank" href={collectionViewUrl} icon={<LinkOutlined />}></Button>
          </Tooltip>
        </If>
      ]}
    >
      <If condition={artistName}>
        <T id="artist_name" values={{ artistName: truncate(artistName, { length: 20 }) }} />
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
      <ButtonDiv>
        <CustomButton onClick={() => handleOnActionClick(true)} data-testid="play-event">
          <PlayCircleFilled />
        </CustomButton>
        <CustomButton onClick={() => handleOnActionClick(false)} data-testid="pause-event">
          <PauseCircleFilled />
        </CustomButton>
      </ButtonDiv>
      <CustomAudio ref={audioRef} src={previewUrl} data-testid="audio-elem" type="audio/mpeg" />
      <If condition={playing}>
        <CustomProgress data-testid="progress-bar" success={{ percent: progress }} showInfo={false} status="active" />
      </If>
    </CustomCard>
  );
};

ItunesCard.propTypes = {
  handlePlaying: PropTypes.func,
  itune: PropTypes.object.isRequired,
  ituneName: PropTypes.string,
  progress: PropTypes.number
};

export default ItunesCard;
