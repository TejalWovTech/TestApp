import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      url: '',
      author: '',
      created_at: '',
      dataSource: [],
      jsonRow: 'true',
    };
  }

  callApi() {
    console.log('call api');
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
      .then(response => response.json())
      .then(responseJson => {
        console.log('response==>', JSON.stringify(responseJson.hits));
        this.setState({
          dataSource: responseJson.hits,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.interval = setInterval(() => {
      this.callApi();
    }, 1000);
  }

  renderItem(item) {
    const data = item;
    const param = this.state.dataSource;
    console.log('renderItem', JSON.stringify(param.length));
    const created_at = data.item.created_at,
      title = data.item.title,
      url = data.item.url,
      author = data.item.author;
    console.log('all data', author, url, title, created_at);

    return (
      <View style={{marginTop: 30}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              jsonRow: false,
              title: title,
              created_at: created_at,
              url: url,
              author: author,
            })
          }
          style={{borderWidth: 0.3, width: '100%'}}>
          <Row size={12}>
            <Col sm={4} md={4} lg={4}>
              <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 10}}>
                Title:-
              </Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 10, marginRight: 20}}>
                {title}
              </Text>
            </Col>
          </Row>
          <Row size={12}>
            <Col sm={4} md={4} lg={4}>
              <Text style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                Url:-
              </Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 10}}>{url}</Text>
            </Col>
          </Row>

          <Row size={12}>
            <Col sm={4} md={4} lg={4}>
              <Text style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                Created_at:-
              </Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 10}}>{created_at}</Text>
            </Col>
          </Row>
          <Row size={12}>
            <Col sm={4} md={4} lg={4}>
              <Text style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                Author:-
              </Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 10}}>{author}</Text>
            </Col>
          </Row>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const param = this.state.dataSource;
    return (
      <View style={{marginTop: 40, alignItems: 'center'}}>
        {this.state.jsonRow ? (
          <FlatList
            data={this.state.dataSource}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={{marginTop: 30, alignItems: 'center'}}>
            <Row size={12}>
              <Col sm={4} md={4} lg={4}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, marginLeft: 10}}>
                  Title:-
                </Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  {this.state.title}
                </Text>
              </Col>
            </Row>
            <Row size={12}>
              <Col sm={4} md={4} lg={4}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  Url:-
                </Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  {this.state.url}
                </Text>
              </Col>
            </Row>

            <Row size={12}>
              <Col sm={4} md={4} lg={4}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  Created_at:-
                </Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  {this.state.created_at}
                </Text>
              </Col>
            </Row>
            <Row size={12}>
              <Col sm={4} md={4} lg={4}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  Author:-
                </Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  {this.state.author}
                </Text>
              </Col>
            </Row>
          </View>
        )}
      </View>
    );
  }
}

export default Test;
