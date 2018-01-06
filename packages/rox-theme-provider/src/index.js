import { createElement, Component } from 'rax';
import { StyleProvider } from 'nuke-theme-provider';
import Theme from 'rox-theme';

export default (props) => {
  return (
    <StyleProvider
      {...props}
      style={Theme}
      androidConfigs={{ materialDesign: false }}
    />
  );
};
