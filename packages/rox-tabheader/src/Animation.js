import {createElement, findDOMNode, Component} from 'rax';
import transition from 'universal-transition';
import {isWeex} from 'universal-env';

let fullWidthPx = 0;
if (isWeex) {
  let weexEnv = typeof WXEnvironment !== 'undefined' ? WXEnvironment : {};
  fullWidthPx = weexEnv.deviceWidth;
} else {
  fullWidthPx = document.body.clientWidth;
}

let Animated = {

  transition: (Node, style, callback) => {
    transition(Node, style, {
      timingFunction: 'ease',
      delay: 0,
      duration: 300
    }, function() {
      callback && callback();
    });
  },

  height: (Node, height, callback) => {
    let heightStr = height * fullWidthPx / 750 + 'px';
    if (isWeex) {
      heightStr = height;
    }
    Animated.transition(Node, {
      height: heightStr,
    }, callback);
  },

  rotate: (Node, rotate, callback) => {
    Animated.transition(Node, {
      transform: 'rotate(' + rotate + 'deg)',
    }, callback);
  },

  scrollTo: (Node, options, callback) => {
    let width = parseInt(options.x);
    let translateStr = 'translate(' + width * fullWidthPx / 750 + 'px, 0)';
    if (isWeex) {
      translateStr = 'translate(' + width + 'px, 0)';
    }
    setTimeout(() => {
      if (!Node) return;
      Animated.transition(Node, {
        transform: translateStr
      }, callback);
    }, 0);
  }

};

export default Animated;
