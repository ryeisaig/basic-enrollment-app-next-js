import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{backgroundColor: "#fafafa", overflow: "hidden"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
