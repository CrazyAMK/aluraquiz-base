import styled from 'styled-components'
import db from "../db.json"
import Head from "../src/components/Head"
import Widget from "../src/components/Widget"
import  Footer from "../src/components/Footer"
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
  return (
    
    <QuizBackground backgroundImage={db.bg}>
      <Head faceImage={db.bg} />
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
                <h1>The legend of zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum</p>
          </Widget.Content>
        </Widget>
      
        <Widget>
          <Widget.Content>
            <h1>Quis da Galera</h1>
            <p>Lorem ipsum</p>
          </Widget.Content>
        </Widget>
        <Footer />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/CrazyAMK/aluraquiz-base" />
    </QuizBackground>

  )
}
