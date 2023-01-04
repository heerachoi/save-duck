import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// export const StSGPInfo = styled.div``;

export const StSGPInputContainer = styled.form`
  margin-top: 4rem;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  background-color: white;
`;

export const StSGPTitleInput = styled.input`
  margin-top: 2rem;
  width: 600px;
  height: 40px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  outline: hidden;
  border: none;
`;

export const StSGPPhotoInput = styled.div`
  margin-bottom: 1rem;
  width: 300px;
  height: 30px;
  background-color: #ffc226;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .btnStart {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .submitPic {
    position: absolute;
    top: px;
    width: 80px;
    height: 15px;
    font-size: 12px;
    color: white;
    margin: 10px 0 0px 110px;
  }

  img {
    max-width: 20px;
    margin-left: 80px;
    margin-top: 7px;
  }

  label {
    width: 300px;
    height: 40px;
    cursor: pointer;
  }

  input[type='file'] {
    position: absolute;
    width: 300px;
    height: 40px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export const StSGPDescriptionInput = styled.textarea`
  width: 700px;
  height: 200px;
  background-color: #f5f5f5;
  outline: none;
  border: none;
  resize: none;
`;

export const StSGPButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;

export const StSGPSubmitButton = styled.button`
  display: inline-block;
  border: none;
  background-color: #ff8a00;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: white;
  font-size: 10px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
`;

export const StSGPCancelButton = styled(NavLink)`
  display: inline-block;
  border: none;
  background-color: #ffc226;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: white;
  font-size: 18px;
  margin-left: 15px;
  position: relative;
  line-height: 350%;
  text-align: center;
`;
