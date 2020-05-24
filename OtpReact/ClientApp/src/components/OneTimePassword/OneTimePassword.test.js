import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import OneTimePassword from './OneTimePassword';

function renderOTP(args) {
  const defaultProps = {}
  const props = { ...defaultProps, ...args }
  return shallow(<OneTimePassword {...props} />);
}

it('renders without crashing', () => {
  shallow(<OneTimePassword />);
});
it('OTP renders correctly', () => {
  const tree = renderer
    .create(<OneTimePassword />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders fields correctly', () => {
  const wrapper = renderOTP();
  expect(wrapper.find("input").length).toBe(1);
  expect(wrapper.find("button").length).toBe(2);
});