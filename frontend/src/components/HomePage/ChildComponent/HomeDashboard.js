import styled from 'styled-components';

export const Header = styled.div`
height:44vh;
margin:0;
padding-left:34px;
padding-right:32px;
paddingLeft:"10px"
`
export const Header1 = styled.div`
height:20vh;
margin:0;
padding-left:34px;
padding-right:32px;
padding-left:10px;
padding-right:10px;
@media (max-width: 1500px) {
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100vw - 20px);
}
width:calc(100vw - 20px);
}
`

export const Body = styled.div`
height:45vh;
margin:0;
background:transparent;
paddingLeft:"10px";
@media (max-width: 800px) {{
 grid-template-columns:1fr !important;
height:fit-content;
margin: 10px 0px;
padding-left:0px !important;
padding-right:0px !important;
box-size:border-box ;
}
`
export const TextWithDownload = styled.div`
display:flex;
justify-content:space-between;
height:35%;
`
export const TextWithDownload1 = styled.div`
display:flex;
justify-content:space-between;
height:20%;

`
export const P = styled.p`
font-size:30px;
font-weight:bold;
padding-bottom:10px;
margin:0px;
margin-top:5px;
 font-family: "Poppins", sans-serif;
`
export const P1 = styled.p`
font-size:30px;
font-weight:bold;
padding-bottom:10px;
margin-bottom:0;
 font-family: "Poppins", sans-serif;
`
export const Card = styled.div`
width:24%;
height:95%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;

`
export const Card2 = styled.div`
width:24%;
height:95%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;
 border:3px solid #f2eaaa;
`
export const Card3 = styled.div`
width:24%;
height:85%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;
 border:3px solid #40c0f7;
 paddingLeft:"10px";
  @media (max-width: 800px)  {
  width: 230px;
  height:180px;

}
`
export const Card4 = styled.div`
width:24%;
height:85%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;
 border:3px solid #eec2c1;
 paddingLeft:"10px";
 
 @media (max-width: 800px)  {
  width: 230px;
  height:180px;

}
`

export const Logo = styled.div`
display:flex;
justify-content:center;
align-items:center;
`
export const Span = styled.p`
display: flex;
  justify-content: center; /* Corrected typo */
  align-items: center; /* Vertically centers content */
  text-align: center;
  font-weight:light;
  text-wrap:nowrap;
  font-size:21px;
  margin:0;
 font-family: "Poppins", sans-serif;`
export const Content = styled.div`
display:flex;
justify-content:center;
font-weight:bold;
font-size:20px;
 font-family: "Poppins", sans-serif;
 margin-top:-10px;`
export const Short = styled.div`
display:flex;
justify-content:center;
align-items:center;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;`
export const Short2 = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-top:2px solid #fae579;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;
background-color:#f2e8ab;`
export const Short3 = styled.div`
display:flex;
justify-content:center;
align-items:center;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;`
export const Short4 = styled.div`
display:flex;
justify-content:center;
align-items:center;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;`
export const S = styled.span`
 font-family: "Poppins", sans-serif;
 font-weight:normal;
 `
export const S1 = styled.span`
 font-family: "Poppins", sans-serif;
 font-weight:normal;
 `
 export const Body1 = styled.div`
 display:grid;
 grid-template-rows:1fr 2fr;
  border: 2px solid #ccc;
  border-radius:3px;
  height:18vh;
  padding-left:"10px";
  @media (max-width: 800px) {
   grid-template-columns: 1fr !important;
   }
 `
 export const HeaderBody = styled.div`
 display:flex;
 justify-content:space-between;
 padding-left:20px;
 padding-right:20px;
 height:6vh;
 align-items:center;
 font-weight:bold;
 font-size:20px;
 font-family: "Poppins", sans-serif;
 border-bottom:2px solid #ccc;
 `
 export const Pmain = styled.p`
 font-size:24px;
font-weight:bold;
 font-family: "Poppins", sans-serif;
  margin:0;
  margin-top:10px;
  margin-left:20px;
 `
 export const Psmall = styled.p`
 margin:0;
 margin-left:20px;

 `
 export const ContentBody = styled.div`
 display:grid;
 grid-template-columns:1fr 1fr;
 `

 export const SvgWrapper = styled.svg`
  height: 40px;
  width: 40px;
  fill: #fed812;
`;
