import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
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
        this.setState({
          dataSource: responseJson.hits,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.callApi();
    }, 1000);
  }

  renderItem(item) {
    const data = item;
    const created_at = data.item.created_at,
      title = data.item.title,
      url = data.item.url,
      author = data.item.author;

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
              <Text style={styles.headText}>Title:-</Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 15}}>{title}</Text>
            </Col>
          </Row>
          <Row size={12}>
            <Col sm={4} md={4} lg={4}>
              <Text style={styles.headText}>Url:-</Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 15}}>{url}</Text>
            </Col>
          </Row>

          <Row size={12}>
            <Col sm={4} md={4} lg={4}>
              <Text style={styles.headText}>Created_at:-</Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 15}}>{created_at}</Text>
            </Col>
          </Row>
          <Row size={12}>
            <Col sm={4} md={4} lg={4}>
              <Text style={styles.headText}>Author:-</Text>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <Text style={{fontSize: 15, marginLeft: 15}}>{author}</Text>
            </Col>
          </Row>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{marginTop: 40, alignItems: 'center'}}>
        {this.state.jsonRow ? (
          <FlatList
            data={this.state.dataSource}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={{marginTop: 30, alignItems: 'center', borderWidth: 0.3}}>
            <Row size={12}>
              <Col sm={4} md={4} lg={4}>
                <Text style={styles.titleText}>Title:-</Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text style={styles.titleText}>{this.state.title}</Text>
              </Col>
            </Row>
            <Row size={12} style={{marginTop: 10}}>
              <Col sm={4} md={4} lg={4}>
                <Text style={styles.titleText}>Url:-</Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text style={styles.titleText}>{this.state.url}</Text>
              </Col>
            </Row>

            <Row size={12} style={{marginTop: 10}}>
              <Col sm={4} md={4} lg={4}>
                <Text style={styles.titleText}>Created_at:-</Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text
                  style={{fontWeight: 'bold', marginLeft: 10, fontSize: 15}}>
                  {this.state.created_at}
                </Text>
              </Col>
            </Row>
            <Row size={12}>
              <Col sm={4} md={4} lg={4} style={{marginTop: 10}}>
                <Text style={styles.titleText}>Author:-</Text>
              </Col>
              <Col sm={8} md={8} lg={8}>
                <Text style={styles.titleText}>{this.state.author}</Text>
              </Col>
            </Row>
          </View>
        )}
      </View>
    );
  }
}

export default Test;
const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
  },

  headText: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
  },
});
