import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
  readonly sortArray: (input: Array<number>) => Array<number>;
  readonly sortByName: (input: Array<{}>) => Array<{}>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeSampleModule');
