# Playground

**This app is to build website with simple html and css**

## About

### Available Element List

- Heading ( 1 - 6 )
- Div as Block
- Span
- image
- Paragraph
- Button
- Link ( three types )
- List
- Table
- Select
- Blockquote
- Figure ( image or audio with figcaption )
- br and hr

### About Styles

- Common Styles are available
- Three different media types are allowed
  ###### Break points
  - General ( for all screen size )
  - Medium ( customizable )
  - Large ( customizable )
- Four types of condition are now available
  - Standard ( normal state )
  - Hover
  - Active
  - Focus
- ClassNames can be created and apply for each node
  - classnames now can use combinator to target children or siblings
- Predefined Styles are also supported ( for available elements and body \* )
- Animations can also be created
- Each element is style-able
- As large range of styling, there is just common used styles, so added custom style key and value

### Tree

- Each node is added in tree like structure box
- Click to select the node ( to edit and style )
- Del to remove ( no undo available )
- Better visualization upon Dom Tree ( for absolute web beginner )
- Highlight helps to show the element

### About Edit

- Each element is editable
- Change text content or add new text node
- **working on to add custom js ( like events or some calculation ) for better experience**

### Others

- Target is shown in each box ( but less understandable )
- Added alert message to show
  - not allowed conditions
  - uneditable
  - hidden element

### Build

- Can download production or JSON to update later
- Can add author name
- Change title
- Add about web content ( meta - better SEO )
- Can download the final production ( single minify .html or .json file )

### Insert Prebuilt Web

- Can insert already built JSON file ( with rules )
- All element must provide id
- First elements must be app root
- Here is the sample structure

```JSON
  {
  "tree": {
    "tagName": "DIV",
    "attrs": { "id": "app" },
    "children": [
      {
        "tagName": "FIGURE",
        "attrs": { "id": "figure_img_1705495635583" },
        "children": [
          {
            "tagName": "IMG",
            "attrs": {
              "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHH8mepO4avVq5NJFuruMoqN02xAqm5Jk7IryH9iVuNw&s",
              "alt": "tree with sunset",
              "id": "img_1705495635583"
            },
            "children": []
          },
          {
            "tagName": "FIGCAPTION",
            "attrs": { "id": "caption_1705495635583" },
            "children": ["Tree"]
          }
        ]
      }
    ]
  },
  "info": {
    "author": "Anonymous",
    "name": "Something beautiful has been born here"
  },
  "styles": {
    "customStyles": {},
    "classNames": {},
    "animations": {},
    "predefinedStyles": {
      "all": {},
      "button": {},
      "link": {},
      "h1": {},
      "h2": {},
      "h3": {},
      "h4": {},
      "h5": {},
      "h6": {},
      "block": {},
      "image": {},
      "paragraph": {},
      "list": {},
      "table": {},
      "selection": {},
      "span": {},
      "figure": {},
      "hr": {}
    }
  }
}

```

**Currently updating code style and making things better**

# Thanks for your time
