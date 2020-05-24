import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import OneTimePassword from './OneTimePassword';

it('renders without crashing', () => {
  shallow(<OneTimePassword />);
});

it('OTP renders correctly', () => {
  const tree = renderer
    .create(<OneTimePassword />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});