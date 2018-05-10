/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render, Component } from 'rax';
import { View, Text, Theme } from 'rox-components';
import RoxPage from 'rox-page';
import Page from 'rox-example-page';

const Core = Theme.Core;

const Palette = props => {
  const { color, token, description, darkText = false } = props;
  const style = {
    width: 120,
    height: 120,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center'
  };
  const tokenStyle = {
    color: darkText ? '#333' : '#FFF',
    fontSize: 32
  };
  const textStyle = {
    width: 120,
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
    fontSize: 20
  };

  return (
    <View>
      {description && (
        <Text
          style={Object.assign(textStyle, { marginBottom: 8, marginTop: 0 })}
        >
          {description}
        </Text>
      )}
      <View style={style}>
        <Text style={tokenStyle}>{token}</Text>
      </View>
      <Text style={textStyle}>{color}</Text>
    </View>
  );
};

let App = class NukeDemoIndex extends Component {
  render() {
    return (
      <RoxPage>
        <Page title={'颜色 Color'}>
          <Page.Intro main={'主品牌色'} />
          <View style={styles.btnWithMargin}>
            <Palette token="B1_1" color={Core['color-brand1-1']} darkText />
            <Palette token="B1_2" color={Core['color-brand1-2']} darkText />
            <Palette token="B1_3" color={Core['color-brand1-3']} darkText />
            <Palette token="B1_4" color={Core['color-brand1-4']} darkText />
            <Palette token="B1_5" color={Core['color-brand1-5']} darkText />
            <Palette token="B1_6" color={Core['color-brand1-6']} />
            <Palette token="B1_7" color={Core['color-brand1-7']} />
            <Palette token="B1_8" color={Core['color-brand1-8']} />
            <Palette token="B1_9" color={Core['color-brand1-9']} />
            <Palette token="B1_10" color={Core['color-brand1-10']} />
          </View>
          <Page.Intro main={'品牌副色'} />
          <View style={styles.btnWithMargin}>
            <Palette token="B2_1" color={Core['color-brand2-1']} darkText />
            <Palette token="B2_2" color={Core['color-brand2-2']} darkText />
            <Palette token="B2_3" color={Core['color-brand2-3']} darkText />
            <Palette token="B2_4" color={Core['color-brand2-4']} darkText />
            <Palette token="B2_5" color={Core['color-brand2-5']} darkText />
            <Palette token="B2_6" color={Core['color-brand2-6']} />
            <Palette token="B2_7" color={Core['color-brand2-7']} />
            <Palette token="B2_8" color={Core['color-brand2-8']} />
            <Palette token="B2_9" color={Core['color-brand2-9']} />
            <Palette token="B2_10" color={Core['color-brand2-10']} />
          </View>
          <Page.Intro main={'中立色 - 线条'} />
          <View style={styles.btnWithMargin}>
            <Palette
              token="N1_6"
              color={Core['color-line1-1']}
              description={'常规'}
              darkText
            />
            <Palette
              token="N1_7"
              color={Core['color-line1-2']}
              description={'深'}
              darkText
            />
            <Palette
              token="N1_8"
              color={Core['color-line1-3']}
              description={'重'}
              darkText
            />
          </View>
          <Page.Intro main={'中立色 - 填充'} />
          <View style={styles.btnWithMargin}>
            <Palette
              token="N1_2"
              color={Core['color-fill1-1']}
              description={'浅'}
              darkText
            />
            <Palette
              token="N1_3"
              color={Core['color-fill1-2']}
              description={'常规'}
              darkText
            />
            <Palette
              token="N1_4"
              color={Core['color-fill1-3']}
              description={'深'}
              darkText
            />
            <Palette
              token="N1_5"
              color={Core['color-fill1-4']}
              description={'重'}
              darkText
            />
          </View>
          <Page.Intro main={'中立色 - 文字'} />
          <View style={styles.btnWithMargin}>
            <Palette
              token="N2_1"
              color={Core['color-text1-1']}
              description={'轻'}
            />
            <Palette
              token="N2_2"
              color={Core['color-text1-2']}
              description={'浅'}
            />
            <Palette
              token="N2_3"
              color={Core['color-text1-3']}
              description={'较浅'}
            />
            <Palette
              token="N2_4"
              color={Core['color-text1-4']}
              description={'深'}
            />
          </View>
          <Page.Intro main={'中立色 - 文字'} />
          <View style={styles.btnWithMargin}>
            <Palette
              token="N1_1"
              color={Core['color-white']}
              darkText
              description={'纯白'}
            />
            <Palette
              token="N1_9"
              color={Core['color-black']}
              description={'纯黑'}
            />
          </View>
          <Page.Intro main={'功能色 - 警示'} />
          <View style={styles.btnWithMargin}>
            <Palette token="F1_1" color={Core['color-warning-1']} darkText />
            <Palette token="F1_2" color={Core['color-warning-2']} />
            <Palette token="F1_3" color={Core['color-warning-3']} />
          </View>
          <Page.Intro main={'功能色 - 报错'} />
          <View style={styles.btnWithMargin}>
            <Palette token="F2_1" color={Core['color-error-1']} darkText />
            <Palette token="F2_2" color={Core['color-error-2']} />
            <Palette token="F2_3" color={Core['color-error-3']} />
          </View>
          <Page.Intro main={'功能色 - 成功'} />
          <View style={styles.btnWithMargin}>
            <Palette token="F2_1" color={Core['color-success-1']} darkText />
            <Palette token="F2_2" color={Core['color-success-2']} />
            <Palette token="F2_3" color={Core['color-success-3']} />
          </View>
          <Page.Intro main={'功能色 - 链接色'} />
          <View style={styles.btnWithMargin}>
            <Palette token="B1_6" color={Core['color-link-1']} />
            <Palette token="N2_3" color={Core['color-link-2']} />
            <Palette token="N2_4" color={Core['color-link-3']} />
          </View>
          <Page.Intro main={'功能色 - 提示色'} />
          <View style={styles.btnWithMargin}>
            <Palette token="F5_1" color={Core['color-notice-1']} darkText />
            <Palette token="F5_2" color={Core['color-notice-2']} />
            <Palette token="F5_3" color={Core['color-notice-3']} />
          </View>
        </Page>
      </RoxPage>
    );
  }
};

const styles = {
  btnWithMargin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    minHeight: 100,
    marginBottom: 50,
    marginLeft: 42,
    marginRight: 42
  },
  btn: {
    marginBottom: 20,
    marginRight: 20
  }
};

render(<App />);
