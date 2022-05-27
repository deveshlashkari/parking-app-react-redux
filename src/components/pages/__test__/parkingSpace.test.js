import React from 'react';
import ReactDOM from 'react-dom';
import ParkingSpace from '../ParkingSpace'
import { render, cleanup } from '@testing-library/react';
// import "jest-dom/extend-expect"
import { isTSAnyKeyword } from '@babel/types'
import renderer from "react-test-renderer"

afterEach(cleanup);
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.createRoot(<ParkingSpace></ParkingSpace>, div)
    ReactDOM.unmountComponentAtNode(div)
})


it("renders button correctly", ()=>{
  const {getByTestId} = render(<ParkingSpace label="Book Your Space +"></ParkingSpace>)
  expect(getByTestId('button1')).toHaveTextContent("Book Your Space +")
})

it("renders button correctly", ()=>{
    const {getByTestId} = render(<ParkingSpace label="submit"></ParkingSpace>)
    expect(getByTestId('button1')).toHaveTextContent("submit")
})

it("matches snapshot", ()=>{
   const tree = renderer.create(<ParkingSpace label="submit"></ParkingSpace>).toJSON()
   expect(tree).toMatchInlineSnapshot();
})