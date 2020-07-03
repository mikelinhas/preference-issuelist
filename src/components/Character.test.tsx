import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react'
import ApolloClient from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';

import { CHARACTER_WITH_FILMS, Character } from './Character';

afterEach(cleanup);

describe("Character Page with description and films", () => {

	const MOCK_QUERY = {
	  request: {
	    query: CHARACTER_WITH_FILMS,
	    variables: {
	      id: 1,
	    },
	  },
	  result: {
		  data: {
		    "characterwithfilms": {
		      "name": "Luke Skywalker",
		      "eye_color": "blue",
		      "hair_color": "blond",
		      "skin_color": "fair",
		      "gender": "male",
		      "films": [
		        {
		          "title": "A New Hope"
		        },
		        {
		          "title": "The Empire Strikes Back"
		        },
		        {
		          "title": "Return of the Jedi"
		        },
		        {
		          "title": "Revenge of the Sith"
		        }
		      ]
		    }
		  }
	  }
	}

	const client = new ApolloClient({
	  uri: '/graphql',
	});

	it("Loads with 'Loading' text and then renders the character's info and films", async () => {
	  const { container, getByText, findByText } = render(
		    <MockedProvider mocks={[MOCK_QUERY]} addTypename={false}>
		      <Character id={1} />
		    </MockedProvider>
	    );

	  expect(getByText(/Loading/)).toBeTruthy();

	  const luke = await findByText(/Luke/)
	  const example_film = await findByText("A New Hope")

	  expect(luke).toBeInTheDocument();
	  expect(example_film).toBeInTheDocument();


	});


})


