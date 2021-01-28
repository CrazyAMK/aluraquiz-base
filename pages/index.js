import styled from 'styled-components'
import db from "../db.json"
import { useRouter } from "next/router"
import { useState } from "react"
import Widget from "../src/components/Widget"
import Footer from "../src/components/Footer"
import GitHubCorner from "../src/components/GitHubCorner"
import QuizBackground from "../src/components/QuizBackground"
import QuizLogo from "../src/components/QuizLogo"


const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;



export default function Home() {

  const router = useRouter();
  const [name, setName] = useState("");

  const sendNameForm = function ( e ) {
    e.preventDefault(); 
    
    // name = document.querySelector('#name').value

    router.push(`/quiz?name=${name}`);
    console.log('Fazendo uma submissão por meio do react');
  }

  const handleInput = function( { target } ){
    console.log(target.value)
    setName(target.value);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
                <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={sendNameForm}>
              <input placeholder="Qual o seu nome?" onChange={ handleInput } />
              <button type="submit" disabled={name.length === 0}>Jogar {name}</button>
            </form>
          </Widget.Content>
        </Widget>
      
        <Widget>
          <Widget.Content>
            <h1>Quiz da Galera</h1>
            <p>Lorem ipsum</p>
          </Widget.Content>
        </Widget>
        <Footer />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/CrazyAMK/aluraquiz-base" />
    </QuizBackground>

  )
}
