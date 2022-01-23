import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {setIsLoading} = useContext(MainContext);
  const loadMedia = async (start = 0, limit = 10) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${baseUrl}media?start=${start}&limit=${limit}`
      );
      if (!response) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();

          return mediaData;
        })
      );
      setMediaArray(media);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    console.log(mediaArray);
  };

  useEffect(() => {
    loadMedia(0, 5);
  }, []);

  return {mediaArray};
};

export {useMedia};
