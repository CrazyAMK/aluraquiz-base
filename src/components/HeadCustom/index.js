import Head from 'next/head'
import db from "../../../db.json"

function IndexPage(){
    return(
        <div>
            <Head>
                <title>Imersão Alura - {db.title}</title>
                <link rel="icon" type="image/png" href={db.favIcon} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Imersão Alura - Quiz Base" key="title" />
            </Head>
            <Head>
                <meta property="og:image" content={db.bg} key="image" />
                <meta property="og:image:type" content="image/jpeg" key="image-type" />
                <meta property="og:image:width" content="800" key="image-width" />
                <meta property="og:image:height" content="600" key="image-height" />
                <link key="font-preconnect" rel="preconnect" href="https://fonts.gstatic.com" />
                <link key="fonts" href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
            </Head>
        </div>
    )
}

export default IndexPage;