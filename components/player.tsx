"use client";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  LoopIcon,
  PauseIcon,
  PlayIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type Props = {
  src: string;
};

const Player = ({ src }: Props) => {
  const [isPlay, setIsPlay] = useState(false);
  const [volume, setVolume] = useState<number>(50);
  const [duration, setDuration] = useState<number>(0);
  const [isLoop, setIsLoop] = useState(false);

  const ref = useRef<HTMLAudioElement>(null);
  const handleDuration = () => {
    if (ref.current) setDuration(ref.current.currentTime);
  };
  const handleDurationUpdate = (value: number[]) => {
    ref!.current!.currentTime = value[0];
    setDuration(value[0]);
  };

  const fastForward = () => {
    if (ref.current) {
      ref.current.currentTime += 10;
      setDuration(ref.current.currentTime);
    }
  };

  const fastRewind = () => {
    if (ref.current) {
      ref.current.currentTime -= 10;
      setDuration(ref.current.currentTime);
    }
  };

  useEffect(() => {
    if (isPlay) {
      ref?.current?.play();
    } else {
      ref?.current?.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    ref?.current?.addEventListener("timeupdate", handleDuration);
    return () => {
      ref?.current?.removeEventListener("timeupdate", handleDuration);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current?.paused) {
      setIsPlay(false);
    }
    if (ref.current?.paused && isLoop) {
      setIsPlay(false);
      setTimeout(() => {
        setIsPlay(true);
      });
    }
  }, [ref.current?.paused]);

  useEffect(() => {
    if (duration === ref.current?.duration) {
      setIsPlay(false);
    }
  }, [duration, ref.current?.duration]);
  return (
    <>
      <audio src={src} controls className="mt-8 hidden" ref={ref} />
      {isPlay && (
        <div className="equalizer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      )}
      <Card className="p-4 mb-4">
        <div className="flex justify-between">
          <div className="flex w-2/8 items-center">
            <TrackPreviousIcon
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={fastRewind}
            />

            <div className="rounded-full border p-1">
              {isPlay && ref.current?.played ? (
                <PauseIcon
                  width={40}
                  height={40}
                  className="cursor-pointer"
                  onClick={() => setIsPlay(false)}
                />
              ) : (
                <PlayIcon
                  width={40}
                  height={40}
                  className="cursor-pointer"
                  onClick={() => setIsPlay(true)}
                />
              )}
            </div>
            <TrackNextIcon
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={fastForward}
            />
          </div>
          <div className="flex w-1/2 items-center ">
            {ref.current && (
              <span className="mr-2 w-1/6">
                {Math.floor(duration / 60) > 9
                  ? Math.floor(duration / 60)
                  : "0" + Math.floor(duration / 60)}{" "}
                :{" "}
                {Math.ceil((duration / 60 - Math.floor(duration / 60)) * 60) > 9
                  ? Math.ceil((duration / 60 - Math.floor(duration / 60)) * 60)
                  : "0" +
                    Math.ceil((duration / 60 - Math.floor(duration / 60)) * 60)}
              </span>
            )}
            <Slider
              max={ref?.current?.duration}
              step={1}
              value={[duration]}
              onValueChange={handleDurationUpdate}
            />
            {ref.current && (
              <span className="ml-2 w-1/6">
                {Math.floor(ref.current.duration / 60) > 9
                  ? Math.floor(ref.current.duration / 60)
                  : "0" + Math.floor(ref.current.duration / 60)}{" "}
                :{" "}
                {Math.ceil(
                  (ref.current.duration / 60 -
                    Math.floor(ref.current.duration / 60)) *
                    60
                ) > 9
                  ? Math.ceil(
                      (ref.current.duration / 60 -
                        Math.floor(ref.current.duration / 60)) *
                        60
                    )
                  : "0" +
                    Math.ceil(
                      (ref.current.duration / 60 -
                        Math.floor(ref.current.duration / 60)) *
                        60
                    )}
              </span>
            )}
            <LoopIcon
              width={30}
              height={30}
              className={`cursor-pointer ml-2`}
              onClick={() => setIsLoop(!isLoop)}
            />
          </div>
          <div className="flex w-1/6 items-center">
            {volume === 0 ? (
              <SpeakerOffIcon
                width={30}
                height={30}
                onClick={() => setVolume(50)}
              />
            ) : (
              <SpeakerQuietIcon
                width={30}
                height={30}
                onClick={() => setVolume(0)}
              />
            )}

            <Slider
              max={100}
              className="ml-2"
              step={ref.current ? ref.current.duration / 100 : 0}
              defaultValue={[volume]}
              value={[volume]}
              onValueChange={(e) => setVolume(e[0])}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Player;
