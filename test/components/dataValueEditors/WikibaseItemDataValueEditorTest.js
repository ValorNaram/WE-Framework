import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import P31 from '../../entities/P31';
import PropertyDescription from 'core/PropertyDescription';
import { Provider } from 'react-redux';
import Q1367759 from '../../entities/Q1367759';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Suggestion from 'components/dataValueEditors/wikibase-item/Suggestion';
import thunk from 'redux-thunk';
import WikibaseItemDataValueEditor from 'components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  const reducers = buildReducers( Q1367759 );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  describe( 'WikibaseItemDataValueEditor', () => {

    const p31Description = new PropertyDescription( P31 );

    it ( 'can be rendered with empty datavalue', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <WikibaseItemDataValueEditor
            datavalue={null}
            onDataValueChange={NOOP}
            propertyDescription={p31Description} />
        </Provider>
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );
      assert.equal( input.value, '' );
    } );

    it ( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <WikibaseItemDataValueEditor
            datavalue={{
              value: {
                'entity-type': 'item',
                'numeric-id': 35120,
                'id': 'Q35120',
              },
              type: 'wikibase-entityid',
            }}
            onDataValueChange={NOOP}
            propertyDescription={p31Description} />
        </Provider>
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );
      assert.equal( input.value, 'Q35120' );
    } );

    it ( 'click; type; select; clear', () => {
      console.log( '===8<=== click; type; select; clear' );
      const datavalue = {
        value: {
          'entity-type': 'item',
          'numeric-id': 35120,
          'id': 'Q35120',
        },
        type: 'wikibase-entityid',
      };
      const onDataValueChange = newDataValue => {
        console.log( 'TEST: onDataValueChange( ' + JSON.stringify( newDataValue ) + ' )' );
        Object.keys( datavalue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
        Object.keys( newDataValue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
      };

      function testSuggestionsProvider( value ) {
        console.log( 'TEST: testSuggestionsProvider(' + value + ')' );
        if ( value == '222' ) {
          return [ 'Q222111', 'Q222222' ];
        }
        return [];
      }

      console.log( 'TEST: initial rendering' );
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <WikibaseItemDataValueEditor
            datavalue={datavalue}
            onDataValueChange={onDataValueChange}
            propertyDescription={p31Description}
            testSuggestionsProvider={testSuggestionsProvider} />
        </Provider>
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );
      assert.equal( input.value, 'Q35120' );

      console.log( 'TEST: ReactTestUtils.Simulate.focus' );
      input.focus();
      ReactTestUtils.Simulate.focus( input );

      console.log( 'TEST: change value: ReactTestUtils.Simulate.change' );
      input.value = '222';
      ReactTestUtils.Simulate.change( input );

      // we don't have API, so suggestions are same
      const suggestionComponents = ReactTestUtils.scryRenderedComponentsWithType( rendered, Suggestion );
      assert.ok( suggestionComponents );
      assert.equal( suggestionComponents.length, 2 );

      // after click we need to see item label
      // console.log( 'TEST: click on Suggestion: ReactTestUtils.Simulate.blur' );
      // ReactTestUtils.Simulate.blur( input );
      console.log( 'TEST: click on Suggestion: ReactTestUtils.Simulate.click' );
      ReactTestUtils.Simulate.click( ReactDOM.findDOMNode( suggestionComponents[ 0 ] ) );
      assert.equal( input.value, 'Q222111' );

      // last check -- that we can DELETE value
      console.log( 'TEST: clear input' );
      input.value = '';
      ReactTestUtils.Simulate.change( input );

      assert.equal( input.value, '' );
      assert.equal( datavalue.value, null );
    } );
  } );
} );
