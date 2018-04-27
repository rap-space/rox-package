/** @jsx createElement */
import { createElement, Component, findDOMNode, render } from 'rax';
import RoxStyleProvider from 'rox-theme-provider';
// eslint-disable-next-line
import Page from '../../packages/rox-example-componet/rox-example-page';
// eslint-disable-next-line
import View from 'nuke-view';
import Input from 'rox-input';
import Text from 'rox-text';

class Demo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      content: ''
    };
  }

  render() {
    return (
      <Page title="Input">
        <Page.Intro main={'基础样式'} />
        <View style={styles.lineWithMargin}>
          <Input
            ref="myinput"
            maxLength={10}
            style={{ height: 60, marginBottom: '20rem' }}
            defaultValue={'今年流行'}
            id="first"
          />
        </View>
        <Page.Intro main={'多行'} />
        <View style={styles.lineWithMargin}>
          <Input
            style={{ height: '300rem', marginBottom: '20rem' }}
            rows={20}
            maxLength={10}
            multiple={true}
            id="third"
            placeholder={'多行文本：说点什么吧'}
          />
        </View>
        <Page.Intro main={'自定义样式'} />
        <View style={styles.lineWithMargin}>
          <Input
            id="fourth"
            style={{
              borderWidth: 0,
              height: 40,
              backgroundColor: '#3089dc',
              color: '#ffffff'
            }}
            inputStyle={{ padding: 0 }}
          />
        </View>

        <Page.Intro main={'不可修改'} />
        <View style={[styles.lineWithMargin, { marginBottom: '10rem' }]}>
          <Input disabled id="fiveth" type="text" value={'不可修改'} />
        </View>
      </Page>
    );
  }
}

const styles = {
  lineWithMargin: {
    marginLeft: 30,
    marginRight: 30
  },
  textLine: {
    marginTop: 20,
    marginBottom: 40
  },
  text: {
    fontSize: 26
  }
};

render(<Demo />);
