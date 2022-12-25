import { RotatingLines } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = () => {
  return <Wrapper>
    <RotatingLines
  strokeColor="#3f51b5"
  strokeWidth="6"
  animationDuration="0.75"
  width="74"
  visible={true}
  />
    </Wrapper>

}