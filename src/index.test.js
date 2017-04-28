import {
  spacingProps,
} from './index';

describe('Battery', () => {
  describe('spacingProps', () => {
    it('matches snapshot', () => {
      expect(spacingProps).toMatchSnapshot()
    });
  });
});