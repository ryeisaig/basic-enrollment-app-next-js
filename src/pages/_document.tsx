import { Html, Head, Main, NextScript } from 'next/document'
import ResponsiveAppBar from '@/components/common/AppBar'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{backgroundColor: "#eeeeee", overflow: "hidden"}}>
        <ResponsiveAppBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
