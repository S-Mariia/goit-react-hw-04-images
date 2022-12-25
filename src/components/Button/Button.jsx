import PropTypes from 'prop-types';
import { LoadMore } from "./Button.styled"

export const Button = ({onClick}) => {
    return <LoadMore onClick={onClick} type="button">Load more</LoadMore>
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}