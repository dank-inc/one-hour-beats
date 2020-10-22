import * as React from 'react';
import { Link } from 'react-router-dom';

export type Prompt = {  
    type: 'general' | 'lyrical', 
    description: string,// description will be a phrase or lyric  
} | {
    type: 'video'
    link: string // optionally and additionaly use the link field for stuff like video links and sample packs.
}

export const prompts: Prompt[] = [
    {type: 'general', description: "make a track that sounds like a childhood nightmare" },
    {type: 'general', description: "make a track that could belong in a western movie"},
    {type: 'general', description: 'make a track that sounds "addictive"'},
    {type: 'general', description: "make a track that gets faster as it goes along"},
    {type: 'general', description: "make a track that makes you feel nostalgic"},
    {type: 'general', description: "make a track that sounds like a national anthem"},
    {type: 'general', description: "make a track in 12/8 time signature"},
    {type: 'general', description: "make a track that sounds like spring time"},
    {type: 'general', description: "make a track that gets you hyped up"},
    {type: 'general', description: "make a track that uses silence as an effect"},
    {type: 'general', description: "make a track that samples itself"},
    {type: 'general', description: "make a track that only uses 1 virtual instrument"},
    {type: 'general', description: "make a track that uses delay as a main feature"},
    {type: 'general', description: "make a track that only uses 1 chord"},
    {type: 'general', description: "make a track that could be used as a soundtrack for a roller derby"},
    {type: 'lyrical', description: `write a song with the first line "once upon a time"`},
    {type: 'lyrical', description: `write a "first name" song that is NOT a love song`},
    {type: 'lyrical', description: `write a song about your job`},
    {type: 'lyrical', description: `write a song about bullies`},
    {type: 'lyrical', description: `write a song about an animal`},
    {type: 'lyrical', description: `write a song that has a rhyme in the title`},
    {type: 'lyrical', description: `write a song about a different time period`},
    {type: 'lyrical', description: `write a song about a book`},
    {type: 'lyrical', description: `write a song about something in the news today`},
    {type: 'lyrical', description: `write a song about secrets`},
    {type: 'lyrical', description: `use the words from a top post in your social feed`},
    {type: 'lyrical', description: `write a love song that is not about romantic love`},
    {type: 'lyrical', description: `write a song with a title from randomwordgenerator.com`},
    {type: 'lyrical', description: `write a song with a "na na na" chorus`},
    {type: 'lyrical', description: `write a song from the point of view of a character in a movie`},
    {type: 'lyrical', description: `write a song that teaches kids about something`},
    {type: 'lyrical', description: `write a song that uses the name of a place as the title`},
    {type: 'video', link: `https://www.youtube.com/watch?v=uhRGegeiAjQ`},
    {type: 'video', link: `https://www.youtube.com/watch?v=iYvJrlgVaRE`},
    {type: 'video', link: `https://www.youtube.com/watch?v=JZPEzGq_yJs`},
    {type: 'video', link: `https://www.youtube.com/watch?v=_YRAmDkcqd4`},
    {type: 'video', link: `https://www.youtube.com/watch?v=hxPbnFc7iU8`},
    {type: 'video', link: `https://www.youtube.com/watch?v=vM8euGwGJsc`},
]
