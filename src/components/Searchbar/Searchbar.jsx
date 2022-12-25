import PropTypes from 'prop-types';
import { Header, Form, Button, Input } from "./Searchbar.styled";
import { BiSearchAlt } from 'react-icons/bi';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const query = evt.target.elements.searchQuery.value;
    onSubmit(query);
    evt.target.reset();
  }

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
            <BiSearchAlt size={32} />
        </Button>

        <Input
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
