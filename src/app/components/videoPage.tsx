"use client";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { fetchTranscripts, fetchTranslations } from "@/lib/api";
import { Caption } from "@/types/types";

const VideoPage = () => {
  const [transcripts, setTranscripts] = useState<Caption[]>([]);
  const [translations, setTranslations] = useState<Caption[]>([]);
  const [displayTranscripts, setDisplayTranscripts] = useState<string>("");
  const [displayTranslations, setDisplayTranslations] = useState<string>("");
  const [playing, setPlaying] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);
  const videoId = "ykG8dVplZ_g";

  const transcriptsRef = useRef<HTMLParagraphElement>(null);
  const translationsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translationsData = await fetchTranslations(videoId);
        const transcriptsData = await fetchTranscripts(videoId);
        setTranscripts(transcriptsData.captions as unknown as Caption[]);
        setTranslations(translationsData.captions as unknown as Caption[]);
      } catch (error) {
        console.error("Failed to fetch transcripts:", error);
      }
    };

    fetchData();
  }, [videoId]);

  useEffect(() => {
    if (transcriptsRef.current) {
      transcriptsRef.current.scrollTop = transcriptsRef.current.scrollHeight;
    }

    if (translationsRef.current) {
      translationsRef.current.scrollTop = translationsRef.current.scrollHeight;
    }
  }, [displayTranscripts, displayTranslations]);

  const handleProgress = (state: { playedSeconds: number }) => {
    const currentTime = state.playedSeconds;
    let newDisplayedTranscripts = "";
    let newDisplayedTranslations = "";

    transcripts.forEach((caption) => {
      const startTime = parseTimeToSeconds(caption.start_time);

      if (currentTime >= startTime) {
        caption.phrases.forEach((phrase) => {
          newDisplayedTranscripts += `${phrase.text} `;
        });
      }
    });

    translations.forEach((caption) => {
      const startTime = parseTimeToSeconds(caption.start_time);

      if (currentTime >= startTime) {
        caption.phrases.forEach((phrase) => {
          newDisplayedTranslations += `${phrase.text} `;
        });
      }
    });

    setDisplayTranscripts(newDisplayedTranscripts.trim());
    setDisplayTranslations(newDisplayedTranslations.trim());
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const parseTimeToSeconds = (time: string) => {
    const parts = time.split(":").map(parseFloat);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  };

  return (
  <div className="h-screen flex items-center">
      <div className="w-full py-12 p-8 lg:flex gap-8 justify-center">
      <div className="border-2 min-w-64 border-black w-full lg:hidden">
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          playing={playing}
          onPause={handlePause}
          onPlay={handlePlay}
          onProgress={handleProgress}
          width="100%"
          height="100%"
        />
      </div>
        <div className="flex w-full flex-col gap-5">
          <div className="lg:bg-white">
            <h1 className="py-1 font-bold text-2xl">Transcript</h1>
            <p ref={transcriptsRef} className="p-2 h-48 border-hidden rounded-2xl bg-white text-xl overflow-y-auto">
              {displayTranscripts}
            </p>
          </div>
          <div className="lg:bg-white">
            <h1 className="py-1 font-bold text-2xl">Translation</h1>
            <p
              ref={translationsRef}
              className="h-48 border-hidden rounded-2xl bg-white text-xl overflow-y-auto"
            >
              {displayTranslations}
            </p>
          </div>
        </div>
        <div className="border-2 hidden lg:flex justify-center items-center min-w-64 border-black w-full">
     <>
     <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          playing={playing}
          onPause={handlePause}
          onPlay={handlePlay}
          onProgress={handleProgress}
          width="100%"
          height="100%"
        />
     </>
      </div>
      </div>
  </div>
  );
};

export default VideoPage;
