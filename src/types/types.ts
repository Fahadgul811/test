export interface Phrase {
    sentence_id: string;
    text: string;
  }
  
  export interface Caption {
      start_time: string;
      end_time: string;
      sequence_number: number;
      phrases: Phrase[];
    }
    
  export interface TranscriptsData {
      [key: string]: {
        video_id: string;
        language: string;
        captions: Caption[];
      };
    }