import { TranscriptsData } from "@/types/types";

export const fetchTranscripts = async (videoId: string): Promise<TranscriptsData> => {
  const response = await fetch(`/api/transcription/${videoId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transcripts');
  }
  return await response.json();
};

export const fetchTranslations = async (videoId: string): Promise<TranscriptsData> => {
  const response = await fetch(`/api/translation/${videoId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch translations');
  }
  return await response.json();
};