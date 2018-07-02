import React, { Component } from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import axios from 'axios';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';


class DogDetail extends Component {
  state = {
    breed: 'Click for more dogs!',
    image: './src/images/placeholder.jpg'
  };

  componentWillMount() {
    axios.get('https://dog.ceo/api/breeds/image/random').then(response => this.setState({ image: response.data.message }));
  }

  fetchDog() {
    //axios.get('https://dog.ceo/api/breeds/image/random').then(response => console.log(response.data.message));
    //axios.get('https://dog.ceo/api/breeds/image/random').then(response => this.setState({ image: response.data.message }));
    axios.get('https://dog.ceo/api/breeds/image/random').then(response => this.processDog(response.data.message));

    //this.setState({ breed: 'dog' });
  }

  processDog(message) {
    const breedRaw = message.split('/')[4].split('-').reverse();
    const breedTemp = [];
    for (let i = 0; i < breedRaw.length; i++) {
      breedTemp[i] = breedRaw[i].charAt(0).toUpperCase() + breedRaw[i].substring(1);
    }
    const breedFormated = breedTemp.join(' ');
    console.log(message);
    this.setState({ breed: breedFormated, image: message });
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.breedTextStyle}>{this.state.breed}</Text>
            </View>
          </CardSection>
          <CardSection>
            <Image
              style={{ flex: 1, height: 300, width: null }}
              source={{ uri: this.state.image }}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => this.fetchDog()}>Generate dog</Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  breedTextStyle: {
    fontSize: 20,
  }
};

export default DogDetail;
