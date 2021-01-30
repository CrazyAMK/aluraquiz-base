import { useRouter } from "next/router"
import { useState } from "react"
import { motion } from 'framer-motion'


import db from "../db.json"
import Widget from "../src/components/Widget"
import Footer from "../src/components/Footer"
import GitHubCorner from "../src/components/GitHubCorner"
import QuizBackground from "../src/components/QuizBackground"
import QuizLogo from "../src/components/QuizLogo"

import Input from "../src/components/Input"
import Button from '../src/components/Button'
import QuizContainer from "../src/components/QuizContainer"
import Link from "../src/components/Link"


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
        <Widget as={motion.section} variants={{show: {opacity: 1, y: "0"}, hidden: { opacity: 0, y: "100%"}}} initial="hidden" animate="show" transition={{delay: 0, duration : 0.5}}>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={sendNameForm}>
              <Input name="userName" value={name} placeholder="Qual o seu nome?" onChange={ handleInput } />
              <Button type="submit" disabled={name.length === 0} > Jogar </Button>
            </form>
          </Widget.Content>
        </Widget>
      
        <Widget  as={motion.section} variants={{show:  {opacity: 1, y: "0"}, hidden: { opacity: 0, y: "100%"}}} initial="hidden" animate="show" transition={{delay: 0.5, duration : 0.5}}>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno.replace(/\//g, '')
                                      .replace('https:', '')
                                      .replace('.vercel.app', '')
                                      .split('.')

                return (

                  <li key={linkExterno}>
                    <Widget.Topic 
                      href={`/quiz/${projectName}___${githubUser}`}
                      as={Link}
                    >
                      {githubUser}/{projectName}
                    </Widget.Topic>
                  </li>
                  
                  );        
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer  as={motion.footer} variants={{show: {opacity: 1, y: "0"}, hidden: { opacity: 0, y: "100%"}}} initial="hidden" animate="show" transition={{delay: 1, duration : 0.5}}/>

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/CrazyAMK/aluraquiz-base" />
    </QuizBackground>

  );
}
