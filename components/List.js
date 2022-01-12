import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ListItem from './listItem';

const dataUrl =
  'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  // let mediaArray = [];
  const loadMedia = async () => {
    try {
      const response = await fetch(dataUrl);
      if (!response) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      setMediaArray(json);
      console.log(mediaArray);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.title}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    ></FlatList>
  );
};

export default List;
