import Icon, { setIconConfig } from './view/icon';
import iconConfigs from './view/code';

export const getTypeIconNames = type => Object.keys(iconConfigs[type].codes);
export const setIconConfig = setIconConfig;

export default Icon;
