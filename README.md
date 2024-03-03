
## Technologies used

- React
- HTML
- CSS
- Sass
- React Bootstrap
- Bootstrap
- Git/GitHub
- Axios


## Approach


---

### Main page


Most of the structure and styling was done with Bootstrap/React Bootstrap.

Below is the initial code - which we updated, as you will see further down.

```jsx
// Main art list
const [artList, setArtList] = useState([]);

// Get request
useEffect(() => {
  const getArtList = async () => {
    try {
      const { data } = await axios.get("https://api.artic.edu/api/v1/artworks");
      setArtList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  getArtList();
}, []);
```

**The JSX:**

I destructured the data and used the values of each key for a piece of art in the JSX, and styled this with Bootstrap.
```

### Search & Filters

Next, I focused on implementing a way to search and filter through the data. I defined one object state, `filters` to track the search term **and** the JSON keys to filter. This was to simplify the code and avoid having double the amount of unnecessary states that would be harder to keep track of.

To create the search function, I used a function to track input by the user in our search bar form and then `RegExp` and control flow to test these terms against values within the database.

For the filters I first populated the dropdown by checking the data returned from the request with an `includes()` method. Then I created `onChange` events on our dropdown menus for each key that I wanted, and used this to update corresponding states that we could then use to map through the data.


### Detail view

This was a lot easier to implement. In AIC's document I found an endpoint that points to one artwork just by appending its unique ID number. So on the index page I created a `Link` component for each `Card` with the artwork's ID at the end - see above. Then for the details page I used that URL with `useParams()` as a parameter to send as part of the get request to return that specific document.


Then I used the object keys within our JSX to display the information that was required:
- artist name
- artist's short biography
- when it was completed
- dimension
- reference number

---

### Pagination

As mentioned, in oder to limit the amount of art displayed on each page, and be able to navigate through these I used pagination. Thankfully the documentation includes an endpoint template that allows pagination. Despite this we had some initial trouble figuring out how to utilise this


---

For the remainder of the project I focused on styling using a mixture of Sass and Bootstrap/React Bootstrap. I decided to keep it simple - which I also think allows the art to take the main focus.