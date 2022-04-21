import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const SearchBox = () => {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    function submitHandler(e){
        e.preventDefault();
        // only redirect the user to the search results...
        //... when there is a keyword
        if(keyword){
            // push to homescreen with search params 
            history.push(`/?keyword=${keyword.trim()}&page=1`) // get rid of whitespace
        }else{
            // do nothing. reload current page
            history.push(history.push(history.location.pathname))
        }
    }
    return(
        <Form onSubmit = {submitHandler}  className="d-flex" >
            <Form.Control
                type = 'search'
                placeholder='search'
                onChange = {(e) => {setKeyword(e.target.value)}}
                className = "mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button
                type="submit"
                variant="secondary"
                className="p-2 m-1"
            >
                Search
            </Button>
        </Form>
    )
}
export default SearchBox