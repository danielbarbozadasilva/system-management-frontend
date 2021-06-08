import styled, { keyframes } from 'styled-components';

const Loading = () => {

    return (
       <LoadingBox>
           <SLoading />
       </LoadingBox>
    )
}

export default Loading;


const LoadingBox = styled.div`
    width:100%;
    height:50vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const SpinLoading = keyframes`
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
`

const SLoading = styled.div`
    border: 5px solid #b8b5ff; 
    border-top: 5px solid #7868e6; 
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${SpinLoading} 1s linear infinite;
`









  