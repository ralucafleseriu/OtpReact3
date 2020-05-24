import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import PasswordGeneration from './PasswordGeneration';

function renderPasswordGeneration(args) {
  const defaultProps = {
    password: "",
    expirationDateTime: Date(),
    onGeneratePassword: () => { }
  }
  const props = { ...defaultProps, ...args }
  return shallow(<PasswordGeneration {...props} />);
}

it('PasswordGeneration renders correctly', () => {
  const tree = renderer
    .create(<PasswordGeneration />);
  expect(tree).toMatchSnapshot();
});

it('renders fields correctly', () => {
  const handleGenerate = jest.fn();
  const wrapper = renderPasswordGeneration({
    onGeneratePassword: handleGenerate
  });
  expect(wrapper.find("input").length).toBe(1);

  // console.log(wrapper.find("button").debug());
  const generateButton = wrapper.find("button");
  expect(generateButton.length).toBe(1);
  expect(generateButton.text()).toBe("Generate one time password");

  generateButton.simulate("click");
  expect(handleGenerate.mock.calls.length).toBe(1);
});