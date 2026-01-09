import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FlatList, Image, Dimensions, StyleSheet, View, Text } from 'react-native';
import { fetchProfiles } from '../../store/redux/profileSlice';

const { width } = Dimensions.get('window');

const ImageCarousel = () => {
  const dispatch = useDispatch();
  const { proDataApi } = useSelector(state => state.profilesList);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View className='mb-4'>
      <Image
      source={item.image}
        style={{ width: 200, height: 200, borderRadius: 10 }}
      />
      <Text>{item.title}, {item.age}</Text>
      <Text>{item.profesional}</Text>
      <Text>{item.location}</Text>
    </View>
  );

  return (
    <FlatList
      data={proDataApi}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default ImageCarousel;
