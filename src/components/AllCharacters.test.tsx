import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react'
import ApolloClient from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';

import { ALL_CHARACTERS, Characters, PreviousBtn, NextBtn } from './AllCharacters';

afterEach(cleanup);

describe('Next Button', () => {
	it("renders a (disabled) next button", () => {
		const { getByText } = render(<NextBtn />)
    expect(getByText(/Next/)).toHaveAttribute('disabled');
	});

	it("renders a (normal) previous button", () => {
	  const { getByText } = render(<NextBtn hasMore="true"/>)
	  expect(getByText(/Next/)).toBeTruthy();
	});	
}) 

describe('Previous Button', () =>{
	it("renders a (disabled) previous button", () => {
		const { getByText } = render(<PreviousBtn page="1"/>);
	  expect(getByText(/Previous/)).toHaveAttribute('disabled');
	});

	it("renders a (normal) previous button", () => {
	  const { getByText } = render(<PreviousBtn page="2"/>);
	  expect(getByText(/Previous/)).toBeTruthy();
	});
})


describe("All Characters List Component", () => {

	const MOCK_QUERY = {
	  request: {
	    query: ALL_CHARACTERS,
	    variables: {
	      page: 1,
	    },
	  },
	  result: {
	    data: {
		    "characters": {
		    	"page": 1,
		    	"hasMore": true,
		    	"characters": [
		        {
		          "id": 1,
		          "name": "Luke Skywalker",
		          "eye_color": "blue",
		          "hair_color": "blond",
		          "skin_color": "fair",
		          "gender": "male"
		        },
		        {
		          "id": 2,
		          "name": "C-3PO",
		          "eye_color": "yellow",
		          "hair_color": "n/a",
		          "skin_color": "gold",
		          "gender": "n/a"
		        },
		        {
		          "id": 3,
		          "name": "R2-D2",
		          "eye_color": "red",
		          "hair_color": "n/a",
		          "skin_color": "white, blue",
		          "gender": "n/a"
		        }
		    	]
		    }
	    }
		}
	}

	const client = new ApolloClient({
	  uri: '/graphql',
	});

	it('Loads with "Loading" text and then renders characters', async () => {
	  const { container, getByText, findByText } = render(
		    <MockedProvider mocks={[MOCK_QUERY]} addTypename={false}>
		      <Characters page="1" />
		    </MockedProvider>
	    );

	  expect(getByText(/Loading/)).toBeTruthy();

	  const luke = await findByText(/Luke/)
	  const c3po = await findByText(/C-3PO/)
	  const r2d2 = await findByText(/R2-D2/)

	  expect(luke).toBeInTheDocument();
	  expect(c3po).toBeInTheDocument();
	  expect(r2d2).toBeInTheDocument();



	});


})


