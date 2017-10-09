/* eslint-disable */
export default {
  "entityMap": {
    "0": {
      "type": "LINK",
      "mutability": "MUTABLE",
      "data": {
        "url": "https://draftjs.org/"
      }
    },
    "1": {
      "type": "LINK",
      "mutability": "MUTABLE",
      "data": {
        "url": "https://github.com/erikras/redux-form/"
      }
    },
    "2": {
      "type": "CODE_HIGHLIGHT",
      "mutability": "IMMUTABLE",
      "data": {
        "language": "javascript",
        "lineNumbers": true,
        "lineHighlight": "",
        "value": "import React, { Component } from 'react';\nimport { reduxDraft } from 'redux-draft';\nimport { Editor } from 'draft-js';\n\nclass MyEditor extends Component {\n  render() {\n    let {\n      setRef,\n      editorState,\n      updateEditorState,\n    } = this.props;\n\n    return (\n      <Editor\n        ref={setRef}\n        editorState={editorState}\n        onChange={updateEditorState}\n        placeholder=\"write something...\"\n      />\n    );\n  }\n}\n\nexport default reduxDraft({\n  name: 'MY_EDITOR',\n})(RawEditor);"
      }
    },
    "3": {
      "type": "CODE_HIGHLIGHT",
      "mutability": "IMMUTABLE",
      "data": {
        "language": "javascript",
        "lineNumbers": true,
        "lineHighlight": "9",
        "value": "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport { Provider } from 'react-redux';\nimport { combineReducers, createStore } from 'redux';\nimport { reducer as draftReducer } from 'redux-draft';\nimport MyEditor from './MyEditor';\n\nlet rootReducer = combineReducers({\n  draft: draftReducer,\n});\nlet store = createStore(rootReducer);\n\nReactDOM.render((\n  <Provider store={store}>\n    <MyEditor />\n  </Provider>\n), document.getElementById('root'));"
      }
    },
    "4": {
      "type": "CODE_HIGHLIGHT",
      "mutability": "IMMUTABLE",
      "data": {
        "language": "markup",
        "lineNumbers": false,
        "lineHighlight": "",
        "value": "npm install --save redux-draft"
      }
    }
  },
  "blocks": [
    {
      "key": "abvni",
      "text": "Redux Draft",
      "type": "HEADER_LEVEL_1",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "5krk",
      "text": "Manage draftjs with redux and utility actions.",
      "type": "blockquote",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [
        {
          "offset": 7,
          "length": 7,
          "key": 0
        }
      ],
      "data": {}
    },
    {
      "key": "eie7p",
      "text": "Introduction",
      "type": "HEADER_LEVEL_2",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "crvio",
      "text": "Draftjs is a great framework, but manage editorState inside a component is like a hell. Redux is a popular state management library that does help us to manage most editor states gracefully. The idea is inspired by redux-form. There are still some benifits like:",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 41,
          "length": 11,
          "style": "CUSTOM_CODE"
        }
      ],
      "entityRanges": [
        {
          "offset": 215,
          "length": 10,
          "key": 1
        }
      ],
      "data": {}
    },
    {
      "key": "4fvva",
      "text": "Action as Utility Function",
      "type": "HEADER_LEVEL_3",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "3iffq",
      "text": "Redux-draft provide hoc to inject actions into your component, which means you can do something like this.props.focus() or this.props.applyBlock('unstyled'). All the magic will happen inside the action creators or reducers.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 101,
          "length": 18,
          "style": "CUSTOM_CODE"
        },
        {
          "offset": 123,
          "length": 33,
          "style": "CUSTOM_CODE"
        }
      ],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "9nbec",
      "text": "Reusable",
      "type": "HEADER_LEVEL_3",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "8edtv",
      "text": "The styles, blocks and entities are defined as a config object passed into hoc. You can reuse this config in the renderer component or elsewhere of you app. All configs with the same name will share the same states.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "8qbnf",
      "text": "Flexible",
      "type": "HEADER_LEVEL_3",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "e3p3i",
      "text": "Redux-draft does not provide an Editor component and you can use the native draft Editor or other Editor components based on draft.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "7867q",
      "text": "Compatible",
      "type": "HEADER_LEVEL_3",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "4fu2t",
      "text": "Since draft-js is still under unstable version, there might be breaking changes in the future. However we inject high level API from hoc and do most draft API calls inside redux-draft reducers, and it's our business to keep compatibility.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "7dm68",
      "text": "Basic Usage",
      "type": "HEADER_LEVEL_2",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "82c4l",
      "text": "Create a component MyEditor wrapped within hoc reduxDraft.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 19,
          "length": 8,
          "style": "CUSTOM_CODE"
        },
        {
          "offset": 47,
          "length": 10,
          "style": "CUSTOM_CODE"
        }
      ],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "84mb6",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [
        {
          "offset": 0,
          "length": 1,
          "key": 2
        }
      ],
      "data": {}
    },
    {
      "key": "673l8",
      "text": "The reducer key must be draft.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 24,
          "length": 5,
          "style": "CUSTOM_CODE"
        }
      ],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "bnru3",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [
        {
          "offset": 0,
          "length": 1,
          "key": 3
        }
      ],
      "data": {}
    },
    {
      "key": "700cb",
      "text": "Installation",
      "type": "HEADER_LEVEL_2",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "bijjp",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [
        {
          "offset": 0,
          "length": 1,
          "key": 4
        }
      ],
      "data": {}
    },
    {
      "key": "bt23m",
      "text": "API",
      "type": "HEADER_LEVEL_1",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "48l7g",
      "text": "reducer",
      "type": "HEADER_LEVEL_2",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "4ng7b",
      "text": "TBD",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "1q7el",
      "text": "reduxDraft",
      "type": "HEADER_LEVEL_2",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "d59n",
      "text": "TBD",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "29ki2",
      "text": "reduxDraftEntity",
      "type": "HEADER_LEVEL_2",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "bi3j",
      "text": "TBD",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }
  ]
};
/* eslint-enable */
