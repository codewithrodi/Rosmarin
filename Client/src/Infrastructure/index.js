import Settings from './Settings.json';
import Validations from './Validations.json'

export const References = Settings.References;

delete Settings.References;

export { Validations, Settings };