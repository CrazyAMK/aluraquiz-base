import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Quiz } from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ dbExterno }){
    return (
        <div>

            <ThemeProvider theme={dbExterno.theme}>
                <Quiz externalDb={dbExterno} />
            </ThemeProvider>
            {/* <pre style={{color: 'black'}}>
                {JSON.stringify(dbExterno.questions, null, 4)}
            </pre> */}

        </div>


    )
}

export async function getServerSideProps(context){

    const [projectName, githubUser] = context.query.id.split('___');
    // console.log("infos que o Next da para nós", context.query.id);

    const refQuiz = `${projectName}.${githubUser}`

    if(!githubUser){
        refQuiz = `${projectName}`;
    }

    try{
    const dbExterno = await fetch(`https://${refQuiz}.vercel.app/api/db`)
        .then((respostaDoServer) => {
            if(respostaDoServer.ok){
                return respostaDoServer.json();
            }
            throw new Error('Falha em pegar os dados');
        })
        .then((respostaConvertidaEmObjeto) =>{
           return respostaConvertidaEmObjeto
        })
        .catch((error) => {
            console.error(error);
        })

    return {
        props: {
            dbExterno,
        },
    };
    }catch(error){
        throw new Error(error);
    }
}