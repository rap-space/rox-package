/** @jsx createElement */
import {createElement, Component,render} from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from '../rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import Layout, { Grid, Col, MultiRow } from 'rox-layout';

let gridData = [];
for (var i = 0; i < 8; i++) {
  gridData.push({
    'name': 'cell' + i
  })
}

let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
    this.state = {
      gridData: gridData
    }
  }
  renderGridCell = (item, index) => {

    return <View style={styles.gridcell}>
      <Text style={styles.funTitle}>{item.name}</Text>
    </View>
  }

  render() {
    var self = this;
    return (
      <RoxStyleProvider>
        <Page title="Layout">
          <Page.Intro main="Grid"></Page.Intro>
          <Grid style={{
            height: '300rem'
          }}>
            <Col
              style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red'
            }}>
              <Text>col1</Text>
              <Text>111</Text>
            </Col>
            <Col
              style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white'
            }}>
              <Text>col2</Text>
              <Text>222</Text>
            </Col>
            <Col
              style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green'
            }}>
              <Text>col3</Text>
              <Text>333</Text>
            </Col>
          </Grid>
          <Page.Intro main="MultiRow"></Page.Intro>
          <View style={styles.lineWithMargin}>
            <MultiRow
              dataSource={self.state.gridData}
              rows={4}
              renderCell={this.renderGridCell}/>
          </View>
        </Page>
      </RoxStyleProvider>
    )
  }
}
const styles = {
  lineWithMargin: {
    marginLeft: '25rem',
    marginRight: '25rem'
  },
  gridcell: {
    height: '200rem',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1rem',
    borderStyle: 'solid',
    borderColor: '#e8e8e8',
    marginTop: '-1rem',
    marginLeft: '-1rem'
  },
  sub: {
    color: '#999999'
  }
}
render(<App/>);
