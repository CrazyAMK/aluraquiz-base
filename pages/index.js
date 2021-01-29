
import { useRouter } from "next/router"
import { useState } from "react"
import db from "../db.json"
import Widget from "../src/components/Widget"
import Footer from "../src/components/Footer"
import GitHubCorner from "../src/components/GitHubCorner"
import QuizBackground from "../src/components/QuizBackground"
import QuizLogo from "../src/components/QuizLogo"

import Input from "../src/components/Input"
import Button from '../src/components/Button'
import QuizContainer from "../src/components/QuizContainer"






export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  const sendNameForm = (e) => {
    e.preventDefault(); 
    
    // name = document.querySelector('#name').value

    router.push(`/quiz?name=${name}`);
    console.log('Fazendo uma submissão por meio do react');
  }

  const handleInput = ( { target } ) => ( setName(target.value) );

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
              <Input name="userName" value={name} placeholder="Qual o seu nome?" onChange={ handleInput } />
              <Button type="submit" disabled={name.length === 0} > Jogar </Button>
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

  );
}
