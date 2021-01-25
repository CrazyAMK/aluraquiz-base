import Head from 'next/head'
import db from "../../../db.json"

function IndexPage(){
    return(
        <div>
            <Head>
                <title>Imersão Alura - Quiz Base</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Imersão Alura - Quiz Base" key="title" />
            </Head>
            <Head>
                <meta property="og:image" content={db.bg} key="image" />
                <meta property="og:image:type" content="image/jpeg" key="image-type" />
                <meta property="og:image:width" content="800" key="image-width" />
                <meta property="og:image:height" content="600" key="image-height" />
            </Head>
        </div>
    )
}

export default IndexPage;