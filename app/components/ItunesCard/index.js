import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import styled from 'styled-components';
import { Card, Tooltip, Button, Progress } from 'antd';
import { LinkOutlined, UserOutlined, AudioOutlined, PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons';
import { T } from '@components/T';
import If from '../If/index';
import * as colors from '@app/themes/colors';

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
    padding: 0;
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

const ItunesCard = ({ onClickAction, itune, currTrack }) => {
  const audioRef = useRef();

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currDur, setCurrDur] = useState(0);

  useEffect(() => {
    if (audioRef.current && playing) {
      audioRef.current.play();
      setDuration(audioRef.current.duration);
    }
    if (audioRef.current && !playing) {
      audioRef.current.pause();
      setDuration(0);
    }
  }, [playing, audioRef.current]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrDur(currTrack?.currentTime);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [currTrack?.currentTime]);

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
      <If
        condition={playing && audioRef.current === currTrack}
        otherwise={
          <ButtonDiv>
            <CustomButton onClick={() => setPlaying(true)} data-testid="play_event">
              <PlayCircleFilled />
            </CustomButton>
          </ButtonDiv>
        }
      >
        <ButtonDiv>
          <CustomButton onClick={() => setPlaying(false)}>
            <PauseCircleFilled />
          </CustomButton>
        </ButtonDiv>
      </If>
      <If condition={previewUrl}>
        <CustomAudio onPlay={(e) => onClickAction(e, audioRef)} onPause={() => setPlaying(false)} ref={audioRef}>
          <source src={previewUrl} type="audio/mpeg" />
        </CustomAudio>
      </If>
      <If condition={playing && audioRef.current === currTrack && currDur && duration}>
        <CustomProgress success={{ percent: (100 * currDur) / duration }} showInfo={false} status="active" />
      </If>
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
