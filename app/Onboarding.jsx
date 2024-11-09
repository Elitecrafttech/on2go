import { useEffect, useState } from 'react'; 
import { router, useNavigation } from 'expo-router';
import { View, Text, Image, Pressable, Dimensions, TouchableOpacity,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Status from '@/components/bar';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Onboarding() {
  const navigation = useNavigation();

  const boarding1 = ()=>{
    navigation.navigate('Aonboarding')
  }




  //Screen dimensions for all screens sizes
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
        'change',
        ({ window, screen }) => {
          setDimensions({ window, screen });
        },
      );
      return () => subscription?.remove();
    }, []);
  
    const windowWidth = dimensions.window.width;
    const windowHeight = dimensions.window.height;
  
  
    return (
      <View className='flex-[1] items-center bg-white' style={{width: windowWidth, padding: windowWidth * 0.03}}>
        <SafeAreaView>
          <Status />
        <View style={{height: dimensions.screen}}>
          <View className='flex-row items-center justify-center relative'>
            <View className='items-center '>
              <Image source={require('../assets/images/icon-bg.png')} style={{ height: 80, width: 80 }}/>
            </View>
              {/* <TouchableOpacity className='border-b-[1px] border-b-[blue]'>
                <Text className='absolute left-[100] bottom-[-13px]  text-[15px]' style={{color: '#b90421', }}  onPress={boarding1}>  Skip  </Text>
              </TouchableOpacity> */}
          </View>   
        <View className='flex-1 justify-center' style={{alignItems: "center", padding: windowWidth * 0.05}}>

        <View className='w-full items-center mt-[30px]'>
            <View style={{gap: 30, marginVertical: windowHeight * 0.02}}>
                <Text className='text-[24px] font-bold'>Welcome</Text>
                <Text className='text-[18px] w-[90vw] leading-[25px]'>Have the hottest deals,rewards, ordering and exclusive promos at your fingertips</Text>
            </View>
            <View>
                <Image source={require('@/assets/images/onboard.png')} />
            </View>
         </View>
           
      </View>
      </View>
      
      </SafeAreaView>
      <Pressable className='absolute bottom-0 justify-around px-[20px] items-center bg-[#b90421] h-[60px] shadow-lg shadow-black/30' style={{width: windowWidth, height: windowHeight * 0.08}} onPress={boarding1}>
          <Text className='text-[18px] text-white text-center'>Take the tour</Text>
         </Pressable>
      </View>
    );
  };