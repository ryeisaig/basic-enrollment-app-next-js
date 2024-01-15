import { Head, Html, Main, NextScript } from 'next/document'
import { useSelector } from 'react-redux';
import { selectListState } from '@/store/listSlice';


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
