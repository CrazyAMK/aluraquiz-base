import React, { useState, useEffect } from 'react';

import styled from 'styled-components'
import { useRouter } from "next/router"
import db from "../db.json"
import Widget from "../src/components/Widget"
import Footer from "../src/components/Footer"
import GitHubCorner from "../src/components/GitHubCorner"
import QuizBackground from "../src/components/QuizBackground"
import QuizLogo from "../src/components/QuizLogo"

import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer';


function LoadingWidget(){
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    )
}

function QuestionWidget({question, questionIndex, totalQuestions, onSubmit}){
    const questionId = `question__${questionIndex+1}`
    return(
        <Widget>
            <Widget.Header>
            <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
            </Widget.Header>
            <img
                alt="Descrição"
                style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>{question.title}</h2>
                <p>{question.description}</p>


                <form onSubmit={(e)=> {e.preventDefault(); onSubmit()}}>
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternative__${index}`
                        return (
                        <Widget.Topic as="label" htmlFor={alternativeId}>
                            <input name={questionId} type="radio" id={alternativeId} style={{display: 'none'}} />
                            {alternative}
                        </Widget.Topic>);
                    })}
                    <Button type="submit"> Confirmar </Button>
                </form>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    RESULT: 'RESULT',
    LOADING: 'LOADING',
}


export default function QuizPage(){
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[currentQuestion];
    

    React.useEffect(() => {
        //fetch()...
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1500);
        
    }, []);


    function handleSubmitQuiz(){
        const nextQuestion = questionIndex + 1;
        if(nextQuestion < totalQuestions){
            setCurrentQuestion(nextQuestion)
        }else{
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                
                {screenState === screenStates.QUIZ &&  <QuestionWidget 
                    question={question}
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions} 
                    onSubmit={handleSubmitQuiz}
                />}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <div>Você acertou X questões</div>}

            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/CrazyAMK/aluraquiz-base" />
      </QuizBackground>
    );
}