import React, { Component } from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import axios from 'axios';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';


class DogDetail extends Component {
  state = {
    breed: 'Welcome, click below for more dogs!!!',
    image: './src/images/placeholder.jpg'
  };

  componentWillMount() {
    //must be called componentWillMount to run on during mount time
    //replaces placeholder image when app opens
    axios.get('https://dog.ceo/api/breeds/image/random').then(response => this.setState({ image: response.data.message }));
  }

  getDogBreedAndImage(url) {
    const breedRawArray = url.split('/')[4].split('-').reverse();
    const breedFormated = this.formatDogBreed(breedRawArray);

    //Debug
    //console.log(url);

    this.setState({ breed: breedFormated, image: url });
  }

  formatDogBreed(breedRawArray) {
    const breedTemp = [];
    for (let i = 0; i < breedRawArray.length; i++) {
      breedTemp[i] = breedRawArray[i].charAt(0).toUpperCase() + breedRawArray[i].substring(1);
    }
    return breedTemp.join(' ');
  }

  callDogApi() {
    //seperate function bc .then() allows for async
    //accounts for api call time

    //Debug
    //axios.get('https://dog.ceo/api/breeds/image/random').then(response => console.log(response.data.message));
    //axios.get('https://dog.ceo/api/breeds/image/random').then(response => this.setState({ image: response.data.message }));

    axios.get('https://dog.ceo/api/breeds/image/random').then(response => this.getDogBreedAndImage(response.data.message));
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <View style={styles.breedViewStyle}>
              <Text style={styles.breedTextStyle}>{this.state.breed}</Text>
            </View>
          </CardSection>
          <CardSection>
            <Image
              style={styles.dogImageStyle}
              source={{ uri: this.state.image }}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => this.callDogApi()}>Click for more dogs</Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  breedViewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  breedTextStyle: {
    fontSize: 20,
  },
  dogImageStyle: {
    flex: 1,
    //TODO find appropriate height
    height: 300,
    width: null
  }
};

export default DogDetail;
