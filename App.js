  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                             // ujian no 1 //

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Text, View } from 'react-native'

class	App	extends	Component	{
    constructor (props) {
      super(props);

      this.state = {
        weight: '',
        height: '',
        sum: ''
      };
    }

    calculateSum = () => {
      const { weight, height } = this.state;

      this.setState({
        sum: (weight * 10000) / Math.pow((height),2)
      });
    }
    
    render () {
      var result;
      if(this.state.sum < 18.5){
        result = 'Berat badan anda kurang'
      }
      else if(this.state.sum>=18.5 && this.state.sum<=24.9){
        result = 'Berat badan ideal'
      }
      else if(this.state.sum>=25.0 && this.state.sum<=29.9){
        result = 'Berat badan berlebih'
      }
      else if(this.state.sum>=30.0 && this.state.sum<=39.9){
        result = 'Berat badan sangat berlebih'
      }
      else if(this.state.sum>=39.9){
        result = 'Obesitas'
      }
      else{
        result = 'Error!'
      }

      return (
        <Container>
          <Header>
            <Body>
              <Title>Indeks Massa Tubuh</Title>
            </Body>
          </Header>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Massa (kg)</Label>
                <Input 
                  onChangeText={(weight) => this.setState({weight})}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Tinggi (cm)</Label>
                <Input 
                  onChangeText={(height) => this.setState({height})}
                />
              </Item>
            </Form>
            <Button block info onPress={this.calculateSum}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Hitung IMT</Text>
            </Button>
            {
              this.state.sum ?
              <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                  <Text>Massa Tubuh:</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.weight}</Text>
                </View>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                  <Text>Tinggi Badan:</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.height}</Text>
                </View>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                  <Text>Indeks Massa Tubuh:</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.sum}</Text>
                </View>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                  <Text>Diagnosa:</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{result}</Text>
                </View>
              </View>
              : null
            }
          </Content>
        </Container>
      );
    }
  }
    export default	App;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                  // ujian no 2 //

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Footer, FooterTab, Item, Input, View, Fab } from 'native-base';
import axios from 'axios'
class App extends Component {
    constructor(){
        super()
        this.state = { 
            resto : [], 
            search : ""
    
        }
    }
    get = () => {
      console.log(this.state.search)
      var uri = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;
      var config = {
        headers:{'user-key':'5664240ace1b2c209e6d5127bbe402f3'}
    }
      axios.get(uri, config).then((ambilData)=>{
        this.setState({
          resto : ambilData.data.restaurants,
          
        })
      })
    };
    renderRestoran() {
        return this.state.resto.map((x,i) =>
        <Card key={i}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: x.restaurant.thumb}} />
                <Body>
                  <Text>{x.restaurant.name}</Text>
                  <Text note>{x.restaurant.location.city}</Text>
                </Body>
              </Left>
              <Right>
                <Text>Rp.{x.restaurant.average_cost_for_two}</Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: x.restaurant.thumb}} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name='home' />
                <Text>{x.restaurant.location.address}</Text>
              </Left>
            </CardItem>
          </Card>
        );
    }
    
  render() {
    return (
      <Container>
        <Header searchBar rounded style={{ backgroundColor: 'blue'}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(x) => {this.setState({search :x})}} />
          </Item>
        </Header>
          <Button full info onPress={() => {this.get()}}>
            <Text style={{ fontSize: 20, color: '#ffffff' }}>Lihat Menu</Text>
          </Button>
        <View style={{ flex: 1 }}>
        <Content>
          {this.renderRestoran()}
        </Content>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
export default App;