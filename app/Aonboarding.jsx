import { useEffect, useState, createRef } from 'react'; 
import { router, useNavigation } from 'expo-router';
import { View, Text, Image, Modal, Dimensions, TouchableOpacity, FlatList, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';


import Status from '@/components/bar';
import { ScrollView } from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const { width: windowWidth } = Dimensions.get('window');

const data = [
  {
    id: 1,
    reward: 'Get Rewards',
    dec: 'Earn Points On Everything You Love And Unlock FREE rewards.',
    image: require('../assets/images/reward.png'),
    imageStyle: { width: windowWidth, height: windowWidth * 0.75, },

  },
  {
    id: 2,
    reward: 'Score deals',
    dec: 'discover new deals to get more for less',
    image: require('../assets/images/Burger.png'),
    imageStyle: { width: windowWidth, height: windowWidth * 0.75, },

  },
  {
    id: 3,
    reward: 'Order easier',
    dec: 'Place an order on your own time and get it fast.',
    valid: 'Log In or Sign Up',
    image: require('../assets/images/orderapp.png'),
    imageStyle: { width: windowWidth, height: windowWidth * 0.99, },

  },
];


export default function Onboarding() {
  const navigation = useNavigation();


  const [modalVisible, setModalVisible] = useState(false);
  const [isSecondContent, setIsSecondContent] = useState(false);
  const [email, setEmail] = useState('');




    // Width of the window will be width of our slides
    // const windowWidth = useWindowDimensions().width;


    // Ref to the FlatList element. We use it to access its methods
    const slider = createRef(null);
    // Slider state contains active item and offset position
    const [sliderState, setSliderState] = useState({
      item: 0,
      offset: 0,
    });
  
    // Update slider state on change event
    const slideChanged = e => {
      const item = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
  
      setSliderState({
        item: item,
        offset: item * windowWidth,
      });
    };
  
    // Renderer function takes the data as an input and outputs the view, should be customized
    const renderer = ({item}) => (

      <View className='flex-[1] items-center bg-white' style={{width: windowWidth, padding: windowWidth * 0.03, height: windowHeight}}>
        <SafeAreaView>
          <Status />
        <View style={{height: dimensions.screen}}>
          <View className='flex-row items-center justify-center relative'>
            <View className='items-center '>
              <Image source={require('../assets/images/icon-bg.png')} style={{ height: 80, width: 80 }}/>
            </View>
              {/* <TouchableOpacity className='border-b-[1px] border-b-[blue]'>
                <Text className='absolute left-[100] bottom-[-13px]  text-[15px]' style={{color: '#b90421', }}  onPress={item.id}>  Skip  </Text>
              </TouchableOpacity> */}
          </View>   
        <View className='flex-1 justify-center' style={{alignItems: "center", padding: windowWidth * 0.05}}>

        <View className='w-full items-center mt-[30px]'>
            <View style={{gap: 30, marginVertical: windowHeight * 0.02}}>
                <Text className='text-[24px] font-extrabold leasding-[25px]'>{item.reward}</Text>
                <Text className='text-[18px] w-[90vw] leading-[25px]'>{item.dec}</Text>
            </View>
         </View>
           
      </View>
            
            <View className='items-center w-full' >
                <Image source={item.image} style={[item.imageStyle]}/>
            </View>
      <TouchableOpacity className='items-center my-[40px]'>
        <Text className='text-[20px]' onPress={() => setModalVisible(true)}>{item.valid}</Text>
      </TouchableOpacity>
            
      </View>
      </SafeAreaView>
      </View>
    );
  
    // Renders control buttons
    const button = direction => (
      <TouchableOpacity
        onPress={() =>
          slider.current.scrollToOffset({
            offset: direction === 'BACK' ? sliderState.offset - windowWidth : sliderState.offset + windowWidth,
            animated: true,
          })}>
        <Text className='font-[14px] my-[14px] p-[15px] text-[#ffffff]'  >{direction}</Text>
      </TouchableOpacity>
    );
  
    // Renders pagination dots
    const dots = () => (
      <View className='flex-[1] flex-row justify-center gap-[5px]' >
        {data.map((_, index) => (
          <View className='w-[10px] h-[10px] rounded-[10px] my-[5px] border-[1.5px] border-[#ffffff]' key={index} style={[sliderState.item === index ? {backgroundColor: '#ffffff'}: null]} />
        ))}
      </View>
    );



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
      <>
      <ScrollView>
      <FlatList
        data={data}
        renderItem={renderer}
        ref={slider}
        keyExtractor={(_, index) => index}
        horizontal={true} 
        pagingEnabled={true} 
        showsHorizontalScrollIndicator={false} 
        onScroll={slideChanged} 
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}/>
      
      <View className='flex-[1] flex-row justify-between items-center absolute w-full bottom-[8px]'  >
        {button('')}
        {dots()}
        {button('')}
      </View>

        <View>
          {/* Button to open the modal */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text>Open Modal</Text>
          </TouchableOpacity>

          {/* Single Modal Component */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
              setIsSecondContent(false); // Reset to the first content when closing
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={() => setModalVisible(false)}
              style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <KeyboardAvoidingView
                behavior="padding"
                style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}
              >
                <View className='bg-white px-[20px] pt-[80px] pb-[140px] gap-[30px] rounded-tl-[20px] rounded-tr-[20px] w-full'
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width: '100%',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  {/* Conditional Rendering of Content */}
                  {!isSecondContent ? (
                    // First Content
                    <View className='gap-[40px]'>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login or Sign Up</Text>
                      <Text style={{ fontSize: 17, marginVertical: 10, lineHeight: 30 }}>
                        By logging in, I agree with On2Go's{' '}
                        <Text style={{ color: 'blue' }} >terms & conditions</Text> and{' '}
                        <Text style={{ color: 'blue' }} >privacy statement</Text>.
                      </Text>
                      <TouchableOpacity onPress={() => setIsSecondContent(true)}>
                        <Text className='border-[1px] border-[#d1d4df] rounded-[10px] p-[10px]'  style={{ fontSize: 18, color: 'black' }}>Continue With Email Address</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    
                    // Second Content (Email Input)
                    <View>
                      
                      <TouchableOpacity className='relative top-[-50]' onPress={() => setIsSecondContent(false)}>
                       <Feather name="chevron-left" size={24} color="black" />
                      </TouchableOpacity>
                      <View className='gap-[60px]'>
                      <View className='gap-[30px]'>
                        <Text className='font-bold text-[25px]'>Let's start with your email</Text>
                        <Text className='text-[17px]'>*Indicate required fields</Text>
                      </View>

                        <TextInput className='placeholder:text-black'
                          placeholder="Email Address"
                          autoCapitalize="none"
                          keyboardType="email-address"
                          value={email}
                          onChangeText={(text) => setEmail(text.replace(/\s/g, ''))}
                          style={{
                            
                            borderBottomWidth: 1.5,
                            borderColor: '#d1d4df',
                            color: 'black',
                            padding: 10,
                            borderRadius: 10,
                            fontSize: 17,
                            width: windowWidth * 0.9,
                            marginTop: 20,
                          }} />
                      </View>
                    </View>
                  )}
                </View>
              </KeyboardAvoidingView>
            </TouchableOpacity>
          </Modal>
        </View>
      </ScrollView>
      </>
    );
  };



  // <View>
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => setModalVisible(!modalVisible)}
  //     >
  //       <TouchableOpacity
  //         activeOpacity={1}
  //         onPressOut={() => setModalVisible(false)}
  //         style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}  >
  //         <View
  //           className='bg-white px-[20px] pt-[80px] pb-[140px] gap-[30px] rounded-tl-[20px] rounded-tr-[20px] w-full'
  //           style={{
  //             shadowColor: '#000',
  //             shadowOffset: { width: 0, height: -2 },
  //             shadowOpacity: 0.3,
  //             shadowRadius: 4,
  //             elevation: 5,
  //           }} >
  //           <View '>
  //             <Text className='font-bold text-[20px]'>Login in or sign up</Text>
  //             <Text className='text-[15px] w-[70vw]'>
  //               By Logging in. I agree with On2Go's
  //               <Text className='text-[blue]' onPress={() => Linking.openURL('http://google.com')}> terms & conditions</Text> and
  //               <Text className='text-[blue]' onPress={() => Linking.openURL('http://google.com')}> privacy statement</Text>
  //             </Text>
  //           </View>
  //           <TouchableOpacity className='border-[1px] border-[#d1d4df] rounded-[10px] p-[10px]' onPress={() => { setModalVisible(false); setModalreg(true); }}>
  //             <Text className='text-[17px]'>Continue With Email Address</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </TouchableOpacity>
  //     </Modal>


  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalreg}
  //       onRequestClose={() => setModalreg(false)}>
  //       <TouchableOpacity
  //         activeOpacity={1}
  //         onPressOut={() => setModalreg(false)}
  //         style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
  //         <View
  //           className='bg-white px-[20px] py-[50px] rounded-tl-[20px] rounded-tr-[20px] w-full'
  //           style={{
  //             shadowColor: '#000',
  //             shadowOffset: { width: 0, height: -2 },
  //             shadowOpacity: 0.3,
  //             shadowRadius: 4,
  //             elevation: 5,
  //           }}
  //         >
  //           <TextInput
  //             className='border-[1px] border-[#d1d4df] rounded-[10px] p-[10px] font-[17px] placeholder:text-[gray]'
  //             style={{ width: windowWidth * 0.90, color: 'black' }}
  //             placeholder="Email Address"
  //             autoCapitalize="none"
  //             keyboardType="email-address"
  //             value={email}
  //             onChangeText={(text) => setEmail(text.replace(/\s/g, ''))}
  //           />
  //         </View>
  //       </TouchableOpacity>
  //     </Modal>