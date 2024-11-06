import React from 'react';
import { Image, SafeAreaView, ScrollView, View, Text  } from 'react-native';
import { Linking } from 'react-native';
import Status from '@/components/bar';
import useDimensions from '@/components/useDimensions';

export default function Onboarding() {
  const { windowWidth, windowHeight, screenWidth, screenHeight } = useDimensions();

  return (
    <View className='flex-[1] pt-[20px] bg-white' style={{width: windowWidth}}>
    <SafeAreaView style={{padding: windowWidth * 0.05, gap: 100, height: screenHeight}}>
      <Status />
        <View className='flex-row items-center justify-center w-full relative'>
            <View className='items-center'>
            <Image source={require('../assets/images/icontop.png')} style={{ height: 40, width: 40 }}/>
            </View>
            <View>
            <Text className='absolute left-[130] bottom-[-5px] border-b-[1px] border-b-[blue] text-[15px]' style={{color: 'blue', }}  onPress={() => Linking.openURL('http://google.com')}>  Skip  </Text>
            </View>
        </View>

        <View className='flex-[1] items-center justify-center '>
            <View>
                <Text>Welcome</Text>
                <Text>Have the hottest deals,rewards, ordering and exclusive promos at your fingertips</Text>
            </View>
            <View>
                <Image source={require('@/assets/images/vect.png')} />
            </View>
      </View>
    </SafeAreaView>
    
    </View>
  );
}
