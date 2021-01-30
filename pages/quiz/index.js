import React, { useState, useEffect } from 'react';

import styled from 'styled-components'
import { useRouter } from "next/router"
import db from "../../db.json"
import Widget from "../../src/components/Widget"
import Footer from "../../src/components/Footer"
import GitHubCorner from "../../src/components/GitHubCorner"
import QuizBackground from "../../src/components/QuizBackground"
import QuizLogo from "../../src/components/QuizLogo"

import Button from '../../src/components/Button'
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';



function ResultWidget({results}){
    const router = useRouter()
    
    // const acertos = results.reduce((somaAtual, resultAtual) => {
    //     const isAcerto = resultAtual === true;
    //     return isAcerto ? somaAtual + 1 : somaAtual
    // } )

    const player = router.query.name;


    const acertos = results.filter((result) => result).length

    return (
        <Widget>
            <Widget.Header>
                Resultado
            </Widget.Header>

            <Widget.Content>

                { acertos === results.length && <img style={{width: "100%"}} src="https://i.pinimg.com/originals/b2/3a/90/b23a908ae01021bc1064937bad061b11.gif" />}

                { acertos >= 3 && acertos < results.length && <img style={{width: "100%"}} src="https://i0.wp.com/www.almeidatecno.com/wp-content/uploads/2019/03/Feliz-com-o-PC-1.gif?resize=400%2C300" />}

                { acertos < 3 && <img style={{width: "100%"}} src="https://dz2cdn1.dzone.com/storage/temp/13990138-code-21.gif" />}

                <p>
                    Olá {player}, você acertou {acertos} pergunta{(acertos < 1 || acertos === 0) ? "s" : ""}
                </p>
                <ul>
                    { results.map((result, index) => (
                        <li key={`question_${index+1}`}>
                            #{index + 1} Resultado: {result === true ? "Acertou!" : "Errou!"}
                        </li>
                    ))}
                </ul>
            </Widget.Content>
        </Widget>
    )
}


function LoadingWidget(){
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                <img style={{maxWidth: "100px", display: "flex" , margin: "auto"}} src={db.gifLoading}/>
            </Widget.Content>
        </Widget>
    )
}

function QuestionWidget({question, questionIndex, totalQuestions, onSubmit, addResult}){
    const questionId = `question__${questionIndex+1}`
    const [isQuestionSubmited, SetIsQuestionSubmited] = useState(false);
    const [selectedAlternative, setSelectedAlternative] = useState(undefined);
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    const submitQuestion = (e) => {
        e.preventDefault(); 
        SetIsQuestionSubmited(true); 

        setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            SetIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
        }, 1500) 
    }

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


                <AlternativesForm onSubmit={submitQuestion}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`
                        const selectedAlternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
                        const isSelected = selectedAlternative === alternativeIndex;
                        return (
                        <Widget.Topic key={alternativeId} as="label" htmlFor={alternativeId} data-selected={isSelected} data-status={isQuestionSubmited && selectedAlternativeStatus}>
                            <input name={questionId} 
                                type="radio" 
                                id={alternativeId} 
                                onChange={() => setSelectedAlternative(alternativeIndex)}
                                style={{display: "none"}} 
                            />
                            {alternative}
                        </Widget.Topic>);
                    })}
                    <Button type="submit" disabled={!hasAlternativeSelected}> Confirmar </Button>
                    {/* <p>selectedAlternative: {`${selectedAlternative}`}</p> */}
                    { isQuestionSubmited && isCorrect && <p>Você Acertou!</p>}
                    { isQuestionSubmited &&!isCorrect && <p>Você Errou!</p>}
                </AlternativesForm>
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
    const [results, setResults] = useState([]);
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

    function addResult(result){
        setResults([...results, result]);
    }


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
                    addResult={addResult}
                />}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <ResultWidget results={results} />}

            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/CrazyAMK/aluraquiz-base" />
            <QuizContainer>
                <Footer />
            </QuizContainer>
      </QuizBackground>
    );
}